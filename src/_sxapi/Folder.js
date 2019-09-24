/*
 * Possible values for the X-FolderClass flag:
 */
export const FolderTypeEnum = {
    Mail     : "Mail",      // IPF.Note
    Calendar : "Calendar",  // IPF.Appointment
    Contacts : "Contact",   // IPF.Contact
    Tasks    : "Task",      // IPF.Task
    Journal  : "Journal",   // IPF.Journal
    Notes    : "Notes"      // IPF.StickyNote
};



/*
 * Possible values for the X-SpecialFolder flag:
 */
export const SpecialFolderEnum = {
    Inbox          : "Inbox",
    Outbox         : "Outbox",
    SentItems      : "SentItems",
    DeletedItems   : "DeletedItems",
    Calendar       : "Calendar",
    Contacts       : "Contacts",
    Drafts         : "Drafts",
    Journal        : "Journal",
    Notes          : "Notes",
    Tasks          : "Tasks",
    Recovery       : "Recovery",
    SharedRoot     : "SharedRoot",
    OtherUsersRoot : "OtherUsersRoot"
};



/*
 * Possible values for a folder ACL.
 */
export const FolderPermissionEnum = {
    UAL_FLDR_PERM_NONE     : 0x00000000,
    UAL_FLDR_PERM_CREATE   : 0x00001000, // Create items in folder
    UAL_FLDR_PERM_READ     : 0x00002000, // Read items in folder
    UAL_FLDR_PERM_SUB_FLDR : 0x00004000, // Create sub-folder
    UAL_FLDR_PERM_EDIT_ALL : 0x00008000, // Edit any items in folder
    UAL_FLDR_PERM_EDIT_OWN : 0x00010000, // Edit own items in folder
    UAL_FLDR_PERM_DEL_ALL  : 0x00020000, // Delete any items in folder
    UAL_FLDR_PERM_DEL_OWN  : 0x00040000, // Delete own items in folder
    UAL_FLDR_PERM_OWNER    : 0x00080000, // Owner of the folder
    UAL_FLDR_PERM_CONTACT  : 0x00100000, // Folder contact
    UAL_FLDR_PERM_VISIBLE  : 0x00200000  // Folder contents visible
};



/*
 * "Named" values for folder permissions.
 */
export const FolderPermissionRoleEnum = {

    NONE                : FolderPermissionEnum.UAL_FLDR_PERM_NONE,

    CONTRIBUTOR         : ( FolderPermissionEnum.UAL_FLDR_PERM_CREATE |
        FolderPermissionEnum.UAL_FLDR_PERM_VISIBLE ),

    REVIEWER            : ( FolderPermissionEnum.UAL_FLDR_PERM_READ |
        FolderPermissionEnum.UAL_FLDR_PERM_VISIBLE ),

    NON_EDITING_AUTHOR  : ( FolderPermissionEnum.UAL_FLDR_PERM_CREATE |
        FolderPermissionEnum.UAL_FLDR_PERM_READ |
        FolderPermissionEnum.UAL_FLDR_PERM_VISIBLE |
        FolderPermissionEnum.UAL_FLDR_PERM_DEL_OWN ),

    AUTHOR              : ( FolderPermissionEnum.UAL_FLDR_PERM_CREATE |
        FolderPermissionEnum.UAL_FLDR_PERM_READ |
        FolderPermissionEnum.UAL_FLDR_PERM_VISIBLE |
        FolderPermissionEnum.UAL_FLDR_PERM_EDIT_OWN |
        FolderPermissionEnum.UAL_FLDR_PERM_DEL_OWN ),

    PUBLISHING_AUTHOR   : ( FolderPermissionEnum.UAL_FLDR_PERM_CREATE |
        FolderPermissionEnum.UAL_FLDR_PERM_READ |
        FolderPermissionEnum.UAL_FLDR_PERM_VISIBLE |
        FolderPermissionEnum.UAL_FLDR_PERM_EDIT_OWN |
        FolderPermissionEnum.UAL_FLDR_PERM_DEL_OWN |
        FolderPermissionEnum.UAL_FLDR_PERM_SUB_FLDR ),

    EDITOR              : ( FolderPermissionEnum.UAL_FLDR_PERM_CREATE |
        FolderPermissionEnum.UAL_FLDR_PERM_READ |
        FolderPermissionEnum.UAL_FLDR_PERM_VISIBLE |
        FolderPermissionEnum.UAL_FLDR_PERM_EDIT_ALL |
        FolderPermissionEnum.UAL_FLDR_PERM_DEL_ALL ),

    PUBLISHING_EDITOR   : ( FolderPermissionEnum.UAL_FLDR_PERM_CREATE |
        FolderPermissionEnum.UAL_FLDR_PERM_READ |
        FolderPermissionEnum.UAL_FLDR_PERM_VISIBLE |
        FolderPermissionEnum.UAL_FLDR_PERM_EDIT_ALL |
        FolderPermissionEnum.UAL_FLDR_PERM_DEL_ALL |
        FolderPermissionEnum.UAL_FLDR_PERM_SUB_FLDR ),

    OWNER               : ( FolderPermissionEnum.UAL_FLDR_PERM_CREATE |
        FolderPermissionEnum.UAL_FLDR_PERM_READ |
        FolderPermissionEnum.UAL_FLDR_PERM_VISIBLE |
        FolderPermissionEnum.UAL_FLDR_PERM_EDIT_ALL |
        FolderPermissionEnum.UAL_FLDR_PERM_DEL_ALL |
        FolderPermissionEnum.UAL_FLDR_PERM_SUB_FLDR |
        FolderPermissionEnum.UAL_FLDR_PERM_OWNER ),

    CUSTOM              : 0x00400000
};

const orderedSpecialFolders = [
    SpecialFolderEnum.Inbox,
    SpecialFolderEnum.Outbox,
    SpecialFolderEnum.Drafts,
    SpecialFolderEnum.SentItems,
    SpecialFolderEnum.DeletedItems,
    SpecialFolderEnum.Calendar,
    SpecialFolderEnum.Contacts,
    SpecialFolderEnum.Notes,
    SpecialFolderEnum.Tasks,
    SpecialFolderEnum.Recovery,
    SpecialFolderEnum.Journal,
    SpecialFolderEnum.SharedRoot,
    SpecialFolderEnum.OtherUsersRoot ];

export class ScalixFolder {

    #data = {}

    constructor(data={}) {
        this.#data = data;
        // HACk fix api
        if (this.name === "INBOX" ) {
            this.#data['special'] = 'Inbox';
        }
        this.#data['folders'] = this.#data['folders'].map(i => new ScalixFolder(i));
    }

    get isSpecialFolder() {
        return this.#data['special'] !== "";
    }

    get specialFolderName() {
        return this.#data['special'];
    }

    get name() {
        return this.#data['name'];
    }

    get subFolders() {
        return this.#data['folders'];
    }

    compareTo(folder) {

        // All special folders first!
        if ( this.isSpecialFolder && !folder.isSpecialFolder )
            return -1;
        else if ( !this.isSpecialFolder && folder.isSpecialFolder )
            return 1;

        if ( this.isSpecialFolder && folder.isSpecialFolder ) {
            return (
                orderedSpecialFolders.indexOf(this.specialFolderName)
                - orderedSpecialFolders.indexOf(folder.specialFolderName)
            );
        }

        const nameA = this.name.toLowerCase();
        const nameB = folder.name.toLowerCase();

        if ( nameA < nameB )
            return -1;
        else if ( nameA > nameB )
            return 1;
        return 0;
    }
}