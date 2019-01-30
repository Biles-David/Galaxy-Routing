function getChecklist (req, res){
  const db = req.app.get('db');
  db.get_checklist()
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err))
}

function addToChecklist (req, res){
  const db = req.app.get('db');
  db.add_to_checklist(req.body.content)
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err))
}

function deleteItem (req, res) {
  const db = req.app.get('db');
  db.checklist.destroy({id: req.params.id}, function(err, res){
    console.log(res)
    console.log(err)
  });
  db.get_checklist()
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err))
}

module.exports = {
  getChecklist,
  addToChecklist,
  deleteItem
}