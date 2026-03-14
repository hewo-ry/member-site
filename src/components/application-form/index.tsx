'use client';

import { useActionState } from 'react';

import { submitApplication } from '@/lib/application';
import { ApplicationFormStateState } from '@/lib/application/contants';
import { ApplicationFormState } from '@/lib/application/types';

// TODO: metadata

const ApplicationForm = () => {
    const [state, formAction, isPending] = useActionState<ApplicationFormState>(submitApplication, {
        application: {},
        state: ApplicationFormStateState.INVALID,
    });

    // TODO: preferredFirstName, preferredLastName

    return state.state !== ApplicationFormStateState.OPTIRE_SUCCESS ? (
        <form action={formAction}>
            <div>
                <input name='firstName' placeholder='Etunimi' defaultValue={state.application.firstName} />
                {'errors' in state && state.errors?.firstName && <span>{state.errors.firstName}</span>}
            </div>
            <div>
                <input name='lastName' placeholder='Sukunimi' defaultValue={state.application.lastName} />
                {'errors' in state && state.errors?.lastName && <span>{state.errors.lastName}</span>}
            </div>
            <div>
                <input name='email' placeholder='Sähköpostiosoite' defaultValue={state.application.email} />
                {'errors' in state && state.errors?.email && <span>{state.errors.email}</span>}
            </div>
            <button disabled={isPending}>Lähetä</button>
            {state.state === ApplicationFormStateState.OPTIRE_FAILED && (
                <span>Hakemuksen lähettäminen epäonnistui, yritä myöhemmin uudelleen</span>
            )}
        </form>
    ) : (
        <span>Kiitos hakemuksesta!</span>
    );
};

export default ApplicationForm;
