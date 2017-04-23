<div id="review-{id}" class="review" review-id="{id}">

	<div class="actions">
		<div class="action delete" onclick="deleteBlock('review', {id});"><i class="fa fa-trash" aria-hidden="true"></i></div>
		<div class="field hidden">{ip}</div>
		<div class="action aprove {aproved}">
			<i class="fa fa-square-o" aria-hidden="true"></i>
			<i class="fa fa-check-square-o" aria-hidden="true"></i>
			<div class="field hidden">{aproved-var}</div>
		</div>
	</div>

	<div class="name field" contenteditable="true">{name}</div>
	<div class="car field" contenteditable="true">{car}</div>

	<div class="text field" contenteditable="true">{text}</div>

	

</div>