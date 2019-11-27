import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import NoUpcomingEvents from './components/noUpcomingEvents/NoUpcomingEvents';
import { profileToStore } from './state/ProfileActions';
import { GuardianValues } from './types/ProfileTypes';
import { Children } from '../child/types/ChildTypes';
import { normalizeChildren } from '../child/childUtils';
import profileQuery from './queries/ProfileQuery';

const Profile: FunctionComponent = () => {
  const { loading, error, data } = useQuery(profileQuery);
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  if (loading) return <div>'Loading...'</div>;
  if (error) return <div>Error! {error.message}</div>;

  /*
   * If the guardian does not exist in the api, they have not registered and we want to send them to the front page.
   */
  if (data.guardians.edges.length === 0) {
    history.push('/home');
    return <div>No profile exists</div>;
  } else {
    const guardian = {
      phone: data.guardians.edges[0].node.phone,
      firstName: data.guardians.edges[0].node.firstName,
      lastName: data.guardians.edges[0].node.lastName,
    };

    const children: Children = normalizeChildren(
      data.guardians.edges[0].node.children.edges
    );

    const profileValues: GuardianValues = {
      firstName: guardian.firstName,
      lastName: guardian.lastName,
      phoneNumber: guardian.phone,
      children,
    };

    const payload: GuardianValues = Object.assign({}, profileValues, {});
    dispatch(profileToStore(payload));

    return (
      <div>
        <h1>{t('profile.heading')}</h1>
        <div>
          {children.map(child => (
            <div>
              {child.firstName} {child.lastName} {child.birthdate}
            </div>
          ))}
        </div>
        <div>TODO: email</div>
        <div>
          {guardian.firstName} {guardian.lastName}
        </div>
        <div>{guardian.phone}</div>
        <NoUpcomingEvents />
      </div>
    );
  }
};

export default Profile;
