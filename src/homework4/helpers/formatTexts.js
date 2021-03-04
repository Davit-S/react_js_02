export function formatDate(dateStr=""){
    return dateStr.slice(0, 10);
}

export function formatText(descriptionText="No description", maxLength){
    if(descriptionText.length>maxLength){
        return descriptionText.slice(0, maxLength)+'...';
    }

    return descriptionText
};