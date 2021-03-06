import type { DataObject } from '../../../store/appStore';

type RowData = {
    [key: string]: string | number;
}

const formatTableData = (fileData: Record<string, DataObject>) => {
    const data: RowData[] = [];
    const allArray: string[][] = []
    Object.values(fileData).forEach((dataObj: DataObject) => {
        dataObj.content.forEach((item, entryIdx) => {
            if (!allArray[entryIdx]) {
                allArray[entryIdx] = []
                allArray[entryIdx].push(item);
            } else {
                allArray[entryIdx].push(item);
            }
        })
    });
    allArray.forEach((array) => {
        const obj: Record<string, string> = {}
        array.forEach((item, itemIdx) => {
            const key =  Object.keys(fileData)[itemIdx];
            obj[key] = item;
        });
        data.push(obj)
    });
    return data;
};

export default formatTableData;
