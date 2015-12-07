# angular-business-hours

This is an angular module to add Google Business opening form to a model. You can add add as many opening hour you want. The directive will convert it to a JSON where you store days and relative opening hours.

### Install with Bower

```sh
$ bower install angular-bootstrap
```

### How to use it

The module has two directives, one to add opening hours and one to present them to the user.

If your model `item` has a field `hours` you can input opening hours with:

    <business-hours-input model="item.hours"></business-hours-input>

And show them with:

    <business-hours model="item.hours"></business-hours>
    
We use [font-awesome](https://fortawesome.github.io/Font-Awesome/) to display selected days inside the form, but it is not included as a dependency in bower.json.