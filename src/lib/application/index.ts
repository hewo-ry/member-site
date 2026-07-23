'use server';

import { createAssociationMember } from '../association';
import { MemberType } from '../association/contants';
import { ApplicationFormStateState } from './contants';
import { Application, ApplicationFormState } from './types';

export const submitApplication = async (
    _: ApplicationFormState,
    formData?: FormData,
): Promise<ApplicationFormState> => {
    const firstName = (formData?.get('firstName') as string | undefined)?.trim();
    const lastName = (formData?.get('lastName') as string | undefined)?.trim();
    const domicile = (formData?.get('domicile') as string | undefined)?.trim();
    const email = (formData?.get('email') as string | undefined)?.trim();
    const allowMemberLetter = formData?.get('allowMemberLetter') === 'on';
    const applicationMessage = (formData?.get('applicationMessage') as string | undefined)?.trim();

    const errors: Partial<Record<keyof Application, string>> = {};

    if (!firstName || firstName.length == 0) errors['firstName'] = 'Etunimet puuttuvat!';
    else if (firstName.length > 32) errors['firstName'] = 'Etunimet saavat olla kaikkiaan enintään 32 merkkiä';

    if (!lastName || lastName.length == 0) errors['lastName'] = 'Sukunimi puuttuu!';
    else if ((lastName.length ?? 0) > 64) errors['lastName'] = 'Sukunimi saa olla enintään 64 merkkiä pitkä';

    if (!domicile || domicile.length == 0) errors['domicile'] = 'Kotipaikka puuttuu!';
    else if ((domicile.length ?? 0) > 64) errors['domicile'] = 'Kotipaikka saa olla enintään 64 merkkiä pitkä';

    if (!email || email.length == 0) errors['email'] = 'Sähköposti puuttuu!';
    else if (email.length > 255) errors['email'] = 'Sähköposti saa olla enintään 255 merkkiä pitkä';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        errors['email'] = 'Sähköposti ei ole kelvollinen';

    if (applicationMessage && applicationMessage.length > 1000)
        errors['applicationMessage'] = 'Perustelut saavat olla enintään 1000 merkkiä pitkät';

    const application: Partial<Application> = {
        firstName,
        lastName,
        domicile,
        email,
        allowMemberLetter,
        applicationMessage,
    };

    if (Object.keys(errors).length > 0 || !firstName || !lastName || !domicile || !email)
        return {
            application,
            errors,
            state: ApplicationFormStateState.INVALID,
        };

    const { error } = await createAssociationMember(undefined, {
        allowMemberLetter,
        applicationMessage: applicationMessage || undefined,
        person: { firstName, lastName, domicile, email },
        type: MemberType.UNPROCESSED,
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
