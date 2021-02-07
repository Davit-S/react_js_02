export function formatDate(dateStr=""){
    return dateStr.slice(0, 10);
}

export function formatDescription(descriptionText="No description"){
    if(descriptionText.length>60){
        return descriptionText.slice(0, 20)+'...';
    }

    return descriptionText
};