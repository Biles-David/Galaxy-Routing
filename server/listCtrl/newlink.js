// <?php
// function addItem($name, $previousId)
// {
//     $sql = "INSERT INTO ordered_items (item_name, previous_item_id)
//             VALUES (?, ?)";
//     // The query function is assumed to prepare and execute a SQL statement with
//     // an array of bound parameters, and return the insert ID or selected row.
//     $itemId = query($sql, [$name, $previousId]);
//     setInsertedItemReference($itemId, $previousId);
// }
// /**
//  * If another item in the list has the same previous ID as the
//  * inserted item, change it to reference the inserted item.
//  */
// function setInsertedItemReference($itemId, $itemPreviousId)
// {
//     $params = [$itemId, $itemId];
//     if ($itemPreviousId === null) {
//         $condition = 'IS NULL';
//     } else {
//         $condition = '= ?';
//         $params[] = $itemPreviousId;
//     }
//     $sql = "UPDATE ordered_items
//             SET previous_item_id = ?
//             WHERE item_id <> ?
//             AND previous_item_id {$condition}";
//     query($sql, $params);
// }

// <?php
// function deleteItem($itemId)
// {
//     $previousId = selectItem($itemId)['previous_item_id'];
//     closeMovedItemGap($itemId, $previousId);
//     query("DELETE FROM ordered_items WHERE item_id = ?", [$itemId]);
// }
// function selectItem($itemId)
// {
//     $sql = "SELECT * FROM ordered_items WHERE item_id = ?";
//     return query($sql, [$itemId]);
// }
// /**
//  * If any other item has a previous ID referencing the moved item,
//  * change it to point to the moved item's original previous ID.
//  */
// function closeMovedItemGap($itemId, $itemPreviousId)
// {
//     $sql = "UPDATE ordered_items
//             SET previous_item_id = ?
//             WHERE previous_item_id = ?";
//     query($sql, [$itemPreviousId, $itemId]);
// }

// <?php
// function updateItem($id, $name, $previousId)
// {
//     if ($id === $previousId) {
//         throw new Exception('Items cannot reference themselves');
//     }
//     $originalItem = selectItem($id);
//     if ($previousId !== $originalItem['previous_item_id']) {
//         // the item was reordered
//         closeMovedItemGap($id, $originalItem['previous_item_id']);
//         setInsertedItemReference($id, $previousId);
//     }
//     $sql = "UPDATE ordered_items
//             SET item_name = ?,
//             previous_item_id = ?
//             WHERE item_id = ?";
//     query($sql, [$name, $previousId, $id]);
// }