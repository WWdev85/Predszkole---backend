export interface MulterDiskUploadedFiles {
    [fieldname: string] : {
        filename: string,
        size: number;
        mimetype: string;
        orginalname: string;
        fieldname: string;
        encoding: string;
    }[] | undefined
}