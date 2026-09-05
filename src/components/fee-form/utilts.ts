import logger from '@/utils/logger';

export const generateFullStartAndEndTimes = (startDate: string): { startTime: string; endTime: string } => {
    if (!/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(startDate)) {
        logger.warn({ startDate }, 'Invalid start date');
        startDate = '01-01';
    }

    const startTime = new Date(`${new Date().getFullYear()}-${startDate}`);
    if (Date.now() < startTime.getTime()) startTime.setFullYear(startTime.getFullYear() - 1);

    const endTime = new Date(startTime);
    endTime.setFullYear(endTime.getFullYear() + 1);
    endTime.setDate(endTime.getDate() - 1);

    return {
        startTime: startTime.toISOString().split('T')[0],
        endTime: endTime.toISOString().split('T')[0],
    };
};
