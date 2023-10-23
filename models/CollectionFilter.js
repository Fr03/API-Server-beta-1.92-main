

export default class CollectionFilter {// l'objet CollectionFilter retourne une liste d'objet filtrer
    constructor(objects, params, model) {// params = les info sur l'URL après le ?
        this.listFiltred = [];
        this.objects = objects;
        this.params = params;
        this.model = model;
        this.searchKeys = [];
        let instance = this;
        if (params != null) {

            Object.keys(params).forEach(function (paramName) {

                let paramValue = params[paramName];

                if (paramValue) {

                    switch (paramName) {

                        case "sort": instance.setSortFields(paramValue); break;

                        case "limit":/* instance.limit = parseInt(paramValue);*/ break;

                        case "offset": /*instance.offset = parseInt(paramValue);*/ break;

                        case "fields":/* instance.fields = paramValue.split(',');*/ break;

                        default: instance.addSearchKey(paramName, paramValue);

                    }

                }

            });

        }
        //this.listFiltred = this.ToFilter(this.params)//Rajouter l'option desc plus tard
    }
    // filtrer par key
    addSearchKey(keyName, value) {

        if (this.model && !this.model.isMember(keyName))

            return;

        this.searchKeys.push({ name: keyName, value: value });

    }

    filterBySearchKey() {
        let filteredCollection = [];
        for (let item of this.objects) {
            let keep = true;//on le garde si true
            for (let searchKey of this.searchKeys) {
                if (!this.valueMatch(item[searchKey.name], searchKey.value)) {
                    keep = false;
                    break;
                }
            }
            if (keep) {
                filteredCollection.push(item);
            }
        }
        return filteredCollection;

    }

    get() {
        return this.filterBySearchKey();
    }
    /*
        ToFilter(params) {//params: sort, offset,
            if (params === null)
                return this.objects;
            else {// vais rajouter le if sortType
                //this.listFiltred = 
            }
    
        }
    */


    //Sort: Prend tous et trier par champ Ex: sort=Name (prend tout les objets et trie les par le nom)
    setSortFields(paramValue) {
        //let filteredCollection = [];
        for (let item of this.objects){
                
                this.listFiltred.push(item);
                this.listFiltred.sort();
        }
    }

    valueMatch(value, searchValue) {//searchValue: le wildcard : ab*
        try {
            let exp = '^' + searchValue.toLowerCase().replace(/\*/g, '.*') + '$';
            return new RegExp(exp).test(value.toString().toLowerCase());
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    compareNum(x, y) {
        if (x === y) return 0;
        else if (x < y) return -1;
        return 1;
    }
    innerCompare(x, y) {
        if ((typeof x) === 'string')
            return x.localeCompare(y);
        else
            return this.compareNum(x, y);
    }
    equal(ox, oy) {
        let equal = true;
        Object.keys(ox).forEach(function (member) {
            if (ox[member] != oy[member]) {
                equal = false;
                return false;
            }
        })
        return equal;
    }
    //trie sur clés      (keys)
}