'use client';

import { useActionState } from 'react';

import { submitApplication } from '@/lib/application';
import { ApplicationFormState } from '@/lib/application/types';

// TODO: metadata

const Page = () => {
    const [
        {
            application: { firstName, lastName, email },
            errors,
            success,
        },
        formAction,
        isPending,
    ] = useActionState<ApplicationFormState>(submitApplication, {
        application: {},
        success: false,
    });

    // TODO: preferredFirstName, preferredLastName

    return !success ? (
        <form action={formAction}>
            <div>
                <input name='firstName' placeholder='Etunimi' defaultValue={firstName} />
                {errors?.firstName && <span>{errors.firstName}</span>}
            </div>
            <div>
                <input name='lastName' placeholder='Sukunimi' defaultValue={lastName} />
                {errors?.lastName && <span>{errors.lastName}</span>}
            </div>
            <div>
                <input name='email' placeholder='Sähköpostiosoite' defaultValue={email} />
                {errors?.email && <span>{errors.email}</span>}
            </div>
            <button disabled={isPending}>Lähetä</button>
        </form>
    ) : (
        <span>Kiitos hakemuksesta!</span>
    );
};

export default Page;
