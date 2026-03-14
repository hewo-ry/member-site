import hewoContent from './hewo';
import pmtyContent from './pmty';
import { OrganizationContent, OrganizationKey } from './types';

const themeEnvValue = process.env.ORG_THEME?.toLowerCase();

const activeOrganization: OrganizationKey = themeEnvValue === 'pmty' ? 'pmty' : 'hewo';

const contentByOrganization: Record<OrganizationKey, OrganizationContent> = {
    hewo: hewoContent,
    pmty: pmtyContent,
};

export const getOrganizationContent = (): OrganizationContent => contentByOrganization[activeOrganization];

export const getOrganizationKey = (): OrganizationKey => activeOrganization;
