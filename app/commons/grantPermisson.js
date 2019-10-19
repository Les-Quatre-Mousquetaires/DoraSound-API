module.exports = {
    /**
     * Return permission của currentUser tương ứng với resource
     * @param {*} grantRequest Bao gồm action và resources. Cú pháp `{action}:{resource}`
     * @param {*} user 
     * @param {*} creatorId 
     */
    grantPermission(grantRequest, user, creatorId) {
        let { _id, role } = user;
        let [action, resource] = grantRequest.split(':');

        let who;
        if (creatorId) who = _id == creatorId ? 'Own' : 'Any';
        else who = 'Any';

        let temp = action + who;

        let ac = global.ac;

        let permission;

        switch (temp) {
            case 'readOwn':
                permission = ac.can(role).readOwn(resource);
                break;
            case 'createOwn':
                permission = ac.can(role).createOwn(resource);
                break;
            case 'updateOwn':
                permission = ac.can(role).updateOwn(resource);
                break;
            case 'deleteOwn':
                permission = ac.can(role).deleteOwn(resource);
                break;
            case 'readAny':
                permission = ac.can(role).readAny(resource);
                break;
            case 'createAny':
                permission = ac.can(role).createAny(resource);
                break;
            case 'updateAny':
                permission = ac.can(role).updateAny(resource);
                break;
            case 'deleteAny':
                permission = ac.can(role).deleteAny(resource);
                break;
            default:
                permission = false;
                break;
        }
        return {permission};
    }
}