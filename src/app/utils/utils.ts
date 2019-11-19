export function getItemLocalCache(item:string):string{
    return  JSON.parse( localStorage.getItem(item))
}