<template>
<div>
<Header></Header>

<div id="admin_panel">

<form method="GET" id="admin_tables">
    <h1>Tables</h1>
    <input type="submit" name="selectedTable" value="'.$tables[$i].'" >
</form>

<table id="admin_tableContent">

    <tr>
        <th class="admin_column">'.$columns[$i].'</th>
        <th><button type="button" onclick="toggleAdd()">Add</button></th>
    </tr>
    <tr>
        <th class="admin_row">'.$rows[$i][$columns[$j]].'</th>
        <th><button type="button" onclick="toggleEdit('.$rows[$i][$columns[0]].')">Edit</button></th>
        <th>
            <form method="POST" action="delete.php">
                <input type="submit" name="delete" value="Delete">
                <input type="hidden" id="table" name="table" value="'.$selectedTable.'">
                <input type="hidden" id="id" name="id" value="'.$rows[$i][$columns[0]].'">
            </form>
        </th>
    </tr>
</table>
</div>

<div id="admin_add">
    <form method="POST" action="add.php">
        <div>Adding into table: '.$selectedTable.'</div>
        <input type="hidden" name="table" value="'.$selectedTable.'">
        <label for="'.$columns[$i].'">'.$columns[$i].'</label>
        <input type="text" name="'.$columns[$i].'" value="" required>
        <input type="submit" name="add" value="Add">
    </form>
</div>

<div id="admin_edit">
<form method="POST" action="edit.php">
    <input type="hidden" id="editid" name="editid" value="">
        <div>Updating in table: '.$selectedTable.', row id: <div id="editInfo"></div></div>
        <input type="hidden" name="table" value="'.$selectedTable.'">
        <label for="'.$columns[$i].'">'.$columns[$i].'</label>
        <input type="text" name="'.$columns[$i].'" value="">
    <input type="submit" name="edit" value="Edit">
</form>
</div>

<div id="overlay" onclick="overlayOff()"></div>
<Footer></Footer>
</div>
</template>

<script lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import Images from '../Images.json';

import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        Header, Footer
    },
    data(){
        return{
            
        }
    },
    methods:{
        
    },
    mounted() {
        
    },
})
</script>