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
        <form action={formAction} className='mx-auto grid max-w-2xl gap-5'>
            <div>
                <label className='field-label' htmlFor='firstName'>
                    Etunimi
                </label>
                <input className='input' id='firstName' name='firstName' placeholder='Etunimi' defaultValue={state.application.firstName} />
                {'errors' in state && state.errors?.firstName && <p className='error-text'>{state.errors.firstName}</p>}
            </div>
            <div>
                <label className='field-label' htmlFor='lastName'>
                    Sukunimi
                </label>
                <input className='input' id='lastName' name='lastName' placeholder='Sukunimi' defaultValue={state.application.lastName} />
                {'errors' in state && state.errors?.lastName && <p className='error-text'>{state.errors.lastName}</p>}
            </div>
            <div>
                <label className='field-label' htmlFor='email'>
                    Sahkoposti
                </label>
                <input className='input' id='email' name='email' placeholder='Sahkopostiosoite' defaultValue={state.application.email} />
                {'errors' in state && state.errors?.email && <p className='error-text'>{state.errors.email}</p>}
            </div>
            <button className='btn btn-primary w-fit' disabled={isPending}>
                {isPending ? 'Lahetetaan...' : 'Laheta hakemus'}
            </button>
            {state.state === ApplicationFormStateState.OPTIRE_FAILED && (
                <p className='error-text'>Hakemuksen lahettaminen epaonnistui, yrita myohemmin uudelleen.</p>
            )}
        </form>
    ) : (
        <p className='success-text'>Kiitos hakemuksesta! Olemme sinuun yhteydessa kasittelyn edetessa.</p>
    );
};

export default ApplicationForm;
