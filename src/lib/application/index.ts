'use server';

import { ApplicationFormState } from './types';

export const submitApplication = async (
    prevState: ApplicationFormState,
    formData?: FormData,
): Promise<ApplicationFormState> => {
    const firstName = (formData?.get('firstName') as string | undefined)?.trim();
    const lastName = (formData?.get('lastName') as string | undefined)?.trim();
    const email = (formData?.get('email') as string | undefined)?.trim();

    const errors: ApplicationFormState['errors'] = {};

    if (!firstName || firstName.length == 0) errors['firstName'] = 'Etunimi puuttuu!';
    else if (firstName.length > 32) errors['firstName'] = 'Etunimi saa olla enintään 32 merkkiä pitkä';

    if (!lastName || lastName.length == 0) errors['lastName'] = 'Sukunimi puuttuu!';
    else if ((lastName.length ?? 0) > 64) errors['lastName'] = 'Sukunimi saa olla enintään 64 merkkiä pitkä';

    if (!email || email.length == 0) errors['email'] = 'Sähköposti puuttuu!';
    else if (email.length > 255) errors['email'] = 'Sähköposti saa olla enintään 255 merkkiä pitkä';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        errors['email'] = 'Sähköposti ei ole kelvollinen';

    const application: ApplicationFormState['application'] = {
        firstName,
        lastName,
        email,
    };

    if (Object.keys(errors).length > 0)
        return {
            application,
            errors,
            success: false,
        };

    // TODO
    console.log('send application', application);

    return {
        application: {
            firstName,
            lastName,
            email,
        },
        success: true,
    };
};
