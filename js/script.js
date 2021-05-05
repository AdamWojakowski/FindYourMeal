"use strict";

const checkedObjects = [];

const arrowUp = '↑';
const arrowDown = '↓';

const addButton = document.getElementById("addButton");
const adding = document.getElementById("adding");
const showAddButton = document.getElementById("showAddButton");
const checkElements = document.getElementsByClassName("check");
const names = document.getElementsByClassName("name");
const addForm = document.getElementById("addMeal");
const recipeModal = document.getElementById("recipeModal");
const modalInner = document.getElementById("modalInner");
const modalClose = document.getElementById("close");

adding.style.display = "none";
showAddButton.value = `${arrowUp} ADD MEAL ${arrowUp}`;

document.getElementById("copyright").innerHTML = `&copy Adam Wojakowski ${new Date().getFullYear()}`

const dishes = [
  {
    name: ['CHICKEN SOUP'],
    category: ['soup'], 
    spices: ['salt', 'pepper', 'chilli', 'maggi'],
    meats: ['chicken'],
    veggies: ['carrot', 'garlic', 'celery', 'parsley', 'onion'],
    other: []
  },

  {
    name: ['SPAGHETTI'],
    category: ['main course'],
    spices: ['salt', 'pepper', 'chilli', 'oregano'],
    meats: ['chicken', 'pork'],
    veggies: ['garlic', 'onion', 'bell pepper'],
    other: []
  },

  {
    name: ['GOULASH'],
    category: ['main course'],
    spices: ['salt', 'pepper', 'chilli'],
    meats: ['pork', 'beef'],
    veggies: ['carrot', 'garlic', 'onion', 'bell pepper', 'mushrooms', 'tomato'],
    other: ['tomato concentrate']
  },

  {
    name: ['SCRAMBLED EGGS'],
    category: ['breakfast'],
    spices: ['salt', 'pepper', 'chilli', 'oregano', 'granulated garlic'],
    meats: ['sausage'],
    veggies: ['garlic', 'onion', 'bell pepper'],
    other: ['eggs']
  },

  {
    name: ['MUESLI'],
    category: ['snack'],
    spices: [],
    meats: [],
    veggies: [],
    other: ['nuts', 'oatmeal', 'natural yoghurt']
  }
];
const recipes =[
  {
    name: dishes[0]["name"].toString(),
    text: 'Cut meats, fill the pot with water, boil about 1-1.5h, cut veggies and throw into the pot, add spices'
  },
  {
    name: dishes[1]["name"].toString(),
    text: 'Cook veggies until they have a nice enough color, throw grinded meats onto a pan and cook until it turns white, add spices'
  },
  {
    name: dishes[2]["name"].toString(),
    text: 'Cook veggies until they have a nice enough color, throw meats onto a pan and cook until it turns white, add other and spices'
  },
  {
    name: dishes[3]["name"].toString(),
    text: 'Cook veggies until they have a nice enough color, then add meats, cook for a while again, then add other and spices'
  },
  {
    name: dishes[4]["name"].toString(),
    text: 'Pour other in chosen amount and category is ready!'   
  }
];
const objFiltered = {
  name: [],
  category: [], 
  spices: [],
  meats: [],
  veggies: [],
  other: []
};
const additionalDishesCount = localStorage.getItem('count');

let unique = (property) => {

  const separatedProperty = [];

  for(let i in dishes){   

    separatedProperty.push(...dishes[i][property]);
  };

  return Array.from(new Set(separatedProperty));
};
let checkBoxed = (properties, propertyType) => {        

  for(let i = 0; i < properties.length; i++){

    properties[i] = properties[i].replace(properties[i], `<div><input type="checkbox" id="${properties[i]}" class="check ${propertyType}" name="${properties[i]}"><label for="${properties[i]}">${properties[i]}</label></div>`);
  };

  return properties.toString().replaceAll(',', '');                                 
};  
let addBreaks = (toBreak, propertyType) => {  

  const broken = toBreak.toString().replaceAll(',', `</div><div  class="${propertyType}" style="display: none;">`);      
  return `<div class="name" style="display: none;">${broken}</div>`;                                    
};
let resetIfUnchecked = () => {
  if(checkedObjects.length === 0){

    const checkElementsArray = Array.from(checkElements);
    const namesArray = Array.from(names);

    checkElementsArray.forEach(i => i.parentElement.style.display = "block");
    namesArray.forEach(i => i.style.display = "none");

    return 'reset';
  };
};
let hideAll = () =>{
  
  const checkElementsArray = Array.from(checkElements);
  const namesArray = Array.from(names);

  checkElementsArray.forEach(i => i.parentElement.style.display = "none");
  namesArray.forEach(i => i.style.display = "none");
};
let getUniqueProps = (array) => {

  for(let el in checkedObjects){

    for(let properties in checkedObjects[el]){

      for(let property in checkedObjects[el][properties]){

        array.push(checkedObjects[el][properties][property]);  
      };
    };
  };

  array = Array.from(new Set(array));
};
let showMatchingCheckboxes = (obj) => {
  for(let i of obj){

    if(Boolean(checkElements.namedItem(i)) === false){
      continue;
    };

    checkElements
    .namedItem(i)
    .parentElement          
    .style
    .display = "block";
  };     
};
let showMatchingNames = (obj) =>{ 
  for(let i in obj){

    for(let index in names){

      if(names.item(index).innerHTML === obj[i]){

        names
        .item(index)                               
        .style
        .display = "block";
      };
    };
  };
};
let refresh = () => {

  if(resetIfUnchecked() === 'reset'){return;};
  hideAll();
  let checkedObjectsProps = [];
  getUniqueProps(checkedObjectsProps);
  showMatchingCheckboxes(checkedObjectsProps);
  showMatchingNames(checkedObjectsProps);
};
let arraysSame = (a, b) => {  //ta funkcja też sortuje
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  };
  return true;
};
let TrimInArray = (array) => {

  for(let element in array){

    if(array[element] === undefined){
      return;
    }

    array[element] = array[element].trim();
  }; 
};
let replaceWithIngredients = (name) => {

  for(let i in recipes){

    if(recipes[i]["name"] === name){
      modalInner.innerText = recipes[i]["text"]
                            .replaceAll("category", objFiltered["category"].toString().replaceAll(",", ", "))
                            .replaceAll("spices", objFiltered["spices"].toString().replaceAll(",", ", "))
                            .replaceAll("meats", objFiltered["meats"].toString().replaceAll(",", ", "))
                            .replaceAll("veggies", objFiltered["veggies"].toString().replaceAll(",", ", "))
                            .replaceAll("other", objFiltered["other"].toString().replaceAll(",", ", "));
    };
  };
};
let sameNameProps = (obj, objTested) => {
  return obj.some(el => el["name"] === objTested["name"]) === false;
};
let isEmpty = (obj) => {
  return obj.length === 0;
}
let copyArray = (array) => {
  return array.slice();
};
let everyIdInSomeObjectProp = (stringsArray, objectsArray, index) => {
  return stringsArray.every(elem => Object.values(objectsArray[index]).some(el => el.includes(elem)));
};
let getCheckedIds = () => {
  return Array.from(checkElements).filter(el => el.checked === true).map(el => el.id);
};
let pushEveryProperty = (obj, pushedIn, el) => {
  for(let properties in obj[el]){

    for(let property in obj[el][properties]){

      pushedIn.push(obj[el][properties][property]);  
    };
  };
}
let subtractIfNothingInCommon = (obj1, obj2, counter) => {                            

  for(let index in obj1){

    if(obj2.some(el => el === obj1[index]) && counter === 0){

      counter++;
    };
  };

  if(counter === 0){

    checkedObjects.splice(el, 1);
  };
}
let FilterByCheckElements = (objName) => {

  let checkedIds = Array.from(checkElements).filter(el => el.checked === true).map(el => el.id);

  let objIndex = dishes.findIndex(el => el["name"].toString() === objName);

  for(let i in dishes[objIndex]){

    let forDefining = dishes[objIndex][i].filter(el => checkedIds.includes(el))

    if(forDefining.length === 0){
      Object.defineProperty(objFiltered, i, {
        value: [i],
      });
      continue;
    };
    Object.defineProperty(objFiltered, i, {
      value: forDefining,
    });
  };
};
let pushIfDifferentNameProps = (objArray, object) => {
  if(isEmpty(objArray)){   

    objArray.push(object);  
  }  
  else{
    let checkedObjectsCopy = copyArray(objArray);

    if(sameNameProps(checkedObjectsCopy, object)){

      objArray.push(object);   
    };
  };    
}
let populate = () => {

  document.getElementById("spices").innerHTML = checkBoxed(unique('spices'), "spices"); 
  document.getElementById("meats").innerHTML = checkBoxed(unique('meats'), "meats");         
  document.getElementById("veggies").innerHTML = checkBoxed(unique('veggies'), "veggies");
  document.getElementById("other").innerHTML = checkBoxed(unique('other'), "other");
  document.getElementById("category").innerHTML = checkBoxed(unique('category'), "category");
  document.getElementById("name").innerHTML = addBreaks(unique('name'), "name");

  for(let i in checkElements){
    checkElements.item(i).addEventListener("input", () => {

      if(checkElements.item(i).checked === true){

        let checkElementsItem = checkElements.item(i);
        let checkedTypeId = checkElementsItem.parentElement.parentElement.id;

        for(let object of dishes){

          if(object[checkedTypeId].includes(checkElementsItem.id)){  

            pushIfDifferentNameProps(checkedObjects, object)                                                                                                         
          };
        }; 
        let checkedObjectsCopy = copyArray(checkedObjects);
        let checkedOnIdArray = getCheckedIds();
        let splicedSubtractCounter = 0;

        for(let index in checkedObjectsCopy){

          if(everyIdInSomeObjectProp(checkedOnIdArray, checkedObjectsCopy, index) === false){ 

            checkedObjects.splice(index - splicedSubtractCounter, 1);
            splicedSubtractCounter++;
          };
        };
      }                       
      else{

        if(isEmpty(checkedObjects)){
          return;
        }

        let checkedObjectsCopy = copyArray(checkedObjects);
        let checkedOnIdArray = getCheckedIds();

        if(isEmpty(checkedOnIdArray)){

          checkedObjects.splice(0);
          refresh();
          return;
        };

        for(let el in checkedObjectsCopy){

          let checkedObjectsProps = [];
          pushEveryProperty(checkedObjectsCopy, checkedObjectsProps, el);

          let counter = 0;

          subtractIfNothingInCommon(checkedOnIdArray, checkedObjectsProps, counter)
        };
        for(let index in dishes){

          if(everyIdInSomeObjectProp(checkedOnIdArray, dishes, index) && checkedObjectsCopy.some(el => el["name"] === dishes[index]["name"]) === false){

            checkedObjects.push(dishes[index]);
          };
        };
      };
      refresh();
    });
  };

  for(let i in names){

    if(isEmpty(names)){
      return;
    };

    names.item(i).addEventListener("click", () => {

      FilterByCheckElements(names.item(i).innerText);
      replaceWithIngredients(names.item(i).innerText);

      recipeModal.style.display = "block";
    });
  };
};
let skipPushingEmpty = (obj, name, array1, array2, array3, array4, array5) => {
  obj["name"].push(name);
  if(array1.includes("") === false){obj["category"].push(...array1);};
  if(array2.includes("") === false){obj["spices"].push(...array2);};
  if(array3.includes("") === false){obj["meats"].push(...array3);};
  if(array4.includes("") === false){obj["veggies"].push(...array4);};
  if(array5.includes("") === false){obj["other"].push(...array5);};
};
let getDishesFromLocalStorage = () => {
  for(let i = 0; i < additionalDishesCount; i++){
    dishes.push(JSON.parse(localStorage.getItem(`additionalDish${i}`)));
  };
  for(let i = 0; i < additionalDishesCount; i++){
    recipes.push(JSON.parse(localStorage.getItem(`additionalRecipe${i}`)));
  };
};

getDishesFromLocalStorage();
populate();

showAddButton.addEventListener("click", () => {
  if(adding.style.display === "none"){
    adding.style.display = "flex";
    showAddButton.value = `${arrowDown} ADD MEAL ${arrowDown}`;
  }
  else{
    adding.style.display = "none";
    showAddButton.value = `${arrowUp} ADD MEAL ${arrowUp}`
  };
});

addButton.addEventListener("click", () => {

  let name = document.getElementById('nameForm').value.toUpperCase();

  if(name.length === 0){

    alert("Name is missing!!!");
    return;
  };

  let recipe = document.getElementById('recipeForm').value;

  if(recipe.length === 0){

    alert("Recipe is missing!!!");
    return;
  };

  let dishNames = Array.from(names).map(el => el.innerText)

  if(dishNames.some(el => el === name)){

    alert("Dish with this name already exists!!!");
    return;
  };

  const recipeNumber = recipes.length - 5;
  const addedRecipe = {
    name: name,
    text: recipe
  };

  localStorage.setItem(`additionalRecipe${recipeNumber}`, JSON.stringify(addedRecipe))
  recipes.push(addedRecipe);

  let category = document.getElementById('categoryForm').value.toLowerCase().split(",");
  let spices = document.getElementById('spicesForm').value.toLowerCase().split(",");
  let meats = document.getElementById('meatsForm').value.toLowerCase().split(",");
  let veggies = document.getElementById('veggiesForm').value.toLowerCase().split(",");
  let other = document.getElementById('otherForm').value.toLowerCase().split(",");
  let combined = [category, spices, meats, veggies, other];

  combined.forEach(TrimInArray);

  const addedDish = 
  {
    name: [],
    category: [], 
    spices: [],
    meats: [],
    veggies: [],
    other: []
  };

  skipPushingEmpty(addedDish, name, category, spices, meats, veggies, other);

  const dishNumber = dishes.length - 5;

  localStorage.setItem(`additionalDish${dishNumber}`, JSON.stringify(addedDish))
  dishes.push(addedDish);
  localStorage.setItem(`count`, dishes.length - 5);
  checkedObjects.length = 0;
  populate();
  refresh();
  addForm.reset();
});

recipeModal.addEventListener('click', (event) => {
  if (event.target == recipeModal){
    recipeModal.style.display = "none";
  };
  if (event.target == modalClose){
    recipeModal.style.display = "none";
  };
});