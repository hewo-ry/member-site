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
        <form action={formAction} className='grid w-full gap-4 sm:gap-5'>
            <div>
                <label className='field-label' htmlFor='firstName'>
                    Etunimi
                </label>
                <input
                    className='input'
                    id='firstName'
                    name='firstName'
                    placeholder='Etunimi'
                    defaultValue={state.application.firstName}
                />
                {'errors' in state && state.errors?.firstName && <p className='error-text'>{state.errors.firstName}</p>}
            </div>
            <div>
                <label className='field-label' htmlFor='lastName'>
                    Sukunimi
                </label>
                <input
                    className='input'
                    id='lastName'
                    name='lastName'
                    placeholder='Sukunimi'
                    defaultValue={state.application.lastName}
                />
                {'errors' in state && state.errors?.lastName && <p className='error-text'>{state.errors.lastName}</p>}
            </div>
            <div>
                <label className='field-label' htmlFor='domicile'>
                    Kotipaikka
                </label>
                <input
                    className='input'
                    id='domicile'
                    name='domicile'
                    placeholder='Kotipaikka (esim. Tampere tai Saksa)'
                    defaultValue={state.application.domicile}
                />
                {'errors' in state && state.errors?.domicile && <p className='error-text'>{state.errors.domicile}</p>}
            </div>
            <div>
                <label className='field-label' htmlFor='email'>
                    Sähköposti
                </label>
                <input
                    className='input'
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    placeholder='Sähköpostiosoite'
                    defaultValue={state.application.email}
                />
                {'errors' in state && state.errors?.email && <p className='error-text'>{state.errors.email}</p>}
            </div>
            <div className='flex items-center'>
                <input
                    className='w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft'
                    id='allowMemberLetter'
                    name='allowMemberLetter'
                    type='checkbox'
                    defaultChecked={state.application.allowMemberLetter}
                />
                <label className='select-none ms-2 text-sm font-medium text-heading' htmlFor='allowMemberLetter'>
                    Minulle saa lähettää jäsenkirjeen
                </label>
                {'errors' in state && state.errors?.allowMemberLetter && (
                    <p className='error-text'>{state.errors.allowMemberLetter}</p>
                )}
            </div>
            <button className='btn btn-primary w-full sm:w-fit' disabled={isPending}>
                {isPending ? 'Lähetetään...' : 'Lähetä hakemus'}
            </button>
            {state.state === ApplicationFormStateState.OPTIRE_FAILED && (
                <p className='error-text'>Hakemuksen lähettäminen epäonnistui, yritä myöhemmin uudelleen.</p>
            )}
        </form>
    ) : (
        <p className='success-text'>Kiitos hakemuksesta! Olemme sinuun yhteydessä käsittelyn edetessä.</p>
    );
};

export default ApplicationForm;
