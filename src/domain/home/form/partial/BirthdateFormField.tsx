import React, { FunctionComponent } from 'react';
import { FieldArrayRenderProps, getIn } from 'formik';
import { useTranslation } from 'react-i18next';

import InputField from '../../../../common/components/form/fields/input/InputField';
import styles from './birthdateFormField.module.scss';
import { validateRequire } from '../../../../common/components/form/validationUtils';
import EnhancedInputField from '../../../../common/components/form/fields/input/EnhancedInputField';

const BirthdateFormField: FunctionComponent<FieldArrayRenderProps> = ({
  name,
  form: { errors, touched },
}) => {
  const fieldTouched = getIn(touched, 'child.birthdate.day');
  const error = getIn(errors, 'childBirthdate');
  const { t } = useTranslation();

  return (
    <div className={styles.birthdateField}>
      <label>{`${t(
        'homePage.preliminaryForm.childBirthdate.input.label'
      )}*`}</label>
      <div className={styles.inputWrapper}>
        <EnhancedInputField
          type="number"
          name={`${name}.day`}
          component={InputField}
          aria-label={t(
            'homePage.preliminaryForm.childBirthdate.input.day.placeholder'
          )}
          placeholder={t(
            'homePage.preliminaryForm.childBirthdate.input.day.placeholder'
          )}
          validate={(value: number) => validateRequire(value)}
          required={true}
          min={1}
          max={31}
        />
        <div className={styles.dot}>.</div>
        <EnhancedInputField
          type="number"
          name={`${name}.month`}
          required={true}
          component={InputField}
          validate={(value: number) => validateRequire(value)}
          aria-label={t(
            'homePage.preliminaryForm.childBirthdate.input.month.placeholder'
          )}
          placeholder={t(
            'homePage.preliminaryForm.childBirthdate.input.month.placeholder'
          )}
          min={1}
          max={12}
        />
        <div className={styles.dot}>.</div>
        <EnhancedInputField
          type="number"
          required={true}
          name={`${name}.year`}
          component={InputField}
          validate={(value: number) => validateRequire(value)}
          aria-label={t(
            'homePage.preliminaryForm.childBirthdate.input.year.placeholder'
          )}
          placeholder={t(
            'homePage.preliminaryForm.childBirthdate.input.year.placeholder'
          )}
        />
      </div>
      {/* not to display error at first render until input got touched */}
      {fieldTouched && <div className={styles.error}>{t(error)}</div>}
    </div>
  );
};

export default BirthdateFormField;
