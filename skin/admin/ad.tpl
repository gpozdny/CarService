<div id="ad-{id}" ad-id="{id}" class="ad clear">

	<div class="actions">
		
		<div class="action delete" onclick="deleteBlock({id});"><i class="fa fa-trash-o" aria-hidden="true"></i></div>
		<div class="action edit" onclick="editAd({id});"><i class="fa fa-pencil" aria-hidden="true"></i></div>
	</div>

    <div class="desc">
            <div class="title {titleClass} field" spellcheck="false" default="Без названия">{title}</div>
            <div class="text  {textClass} field" spellcheck="false" default="Без описания">{text}</div>
    </div>

</div>