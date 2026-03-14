'use server';

import { createAssociationMember } from '../association';
import { ApplicationFormStateState } from './contants';
import { Application, ApplicationFormState } from './types';

export const submitApplication = async (
    _: ApplicationFormState,
    formData?: FormData,
): Promise<ApplicationFormState> => {
    const firstName = (formData?.get('firstName') as string | undefined)?.trim();
    const lastName = (formData?.get('lastName') as string | undefined)?.trim();
    const email = (formData?.get('email') as string | undefined)?.trim();

    const errors: Partial<Record<keyof Application, string>> = {};

    if (!firstName || firstName.length == 0) errors['firstName'] = 'Etunimi puuttuu!';
    else if (firstName.length > 32) errors['firstName'] = 'Etunimi saa olla enintään 32 merkkiä pitkä';

    if (!lastName || lastName.length == 0) errors['lastName'] = 'Sukunimi puuttuu!';
    else if ((lastName.length ?? 0) > 64) errors['lastName'] = 'Sukunimi saa olla enintään 64 merkkiä pitkä';

    if (!email || email.length == 0) errors['email'] = 'Sähköposti puuttuu!';
    else if (email.length > 255) errors['email'] = 'Sähköposti saa olla enintään 255 merkkiä pitkä';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        errors['email'] = 'Sähköposti ei ole kelvollinen';

    const application: Partial<Application> = {
        firstName,
        lastName,
        email,
    };

    if (Object.keys(errors).length > 0 || !firstName || !lastName || !email)
        return {
            application,
            errors,
            state: ApplicationFormStateState.INVALID,
        };

    const { error } = await createAssociationMember(undefined, {
        person: { firstName, lastName, email },
        type: 'BASIC',
    });

    return error
        ? {
              application,
              error,
              state: ApplicationFormStateState.OPTIRE_FAILED,
          }
        : {
              state: ApplicationFormStateState.OPTIRE_SUCCESS,
          };
};
