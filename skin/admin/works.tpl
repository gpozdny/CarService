<div class="work clear" id="compare-{id}" compare="{id}">

	<div class="compare before {ready-before}" image="before" type="2">
		<div class="add-image" ><input class="chose" type="file" name="files[]"  accept="image/*" multiple="multiple" title=\'Click to add Images\'><i class="fa fa-picture-o" aria-hidden="true"></i></div>
		<img src="{src-before}"/>
	</div>

	<div class="delete" onclick="deleteCompare({id});">
		<i class="fa fa-trash" aria-hidden="true"></i>
	</div>

	<div class="compare after {ready-after}" image="after" type="2">
		<div class="add-image" ><input class="chose" type="file" name="files[]"  accept="image/*" multiple="multiple" title=\'Click to add Images\'><i class="fa fa-picture-o" aria-hidden="true"></i></div>
		<img src="{src-after}"/>
	</div>

</div>