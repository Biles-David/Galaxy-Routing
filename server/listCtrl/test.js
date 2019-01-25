const massive = require('massive');
const express = require('express');
const app = express()
massive(CONNECTION_STRING)
.then(db => app.set('db', db))
.catch(err => console.log(err));


function addItem( name, previousId ){
  db.run("INSERT INTO list ( item_name, previous_item ) VALUES ($1, $2 )")
  itemId = query(db.run, [name, previousId]);
  setInsertedItemReference(itemId, previousId);
} 

function setInsertedItemReference(itemId, itemPreviousId)