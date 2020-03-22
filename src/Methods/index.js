

export default function selectOptionsConverter (array){
    let newArray = []
      array.map((item) => {
        item.value = item._id 
        item.label = item.name ? item.name : item.label
        newArray.push(item)
    })
    return newArray
}