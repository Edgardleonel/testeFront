export function arrayNoRepeat(array) {
    const seen = {}
    const uniqueCategory = array.filter(function(item){
    if(seen.hasOwnProperty(item.id)){
        return false
    } else {
    seen[item.id] = true
    return true
    }
    })
    return uniqueCategory
}
