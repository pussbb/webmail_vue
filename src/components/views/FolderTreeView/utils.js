

export function routerName(folder) {
    if (folder.isCalendarFolder) {
        return 'calendar';
    }
    if (folder.isTasksFolder) {
        return 'tasks';
    }
    if (folder.isContactsFolder) {
        return 'people';
    }
    return 'mail'
}