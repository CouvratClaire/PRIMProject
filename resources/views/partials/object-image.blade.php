<?php $page = get_page_by_title($object['name']);
$video = $object['video_name'];
$hasVideo = strlen($video) > 0;
?>
@if($hasVideo)
<div class="gallery_item-{{$key%2}} anim-on-click">
    @if($page->guid)
    <a class="item-click" href="{{$page->guid}}">
        <div class="video">
            <img class="image gallery_image" src="{{$object['image']}}" />
            <video class="thevideo gallery_image" loop muted autoplay>
                <source src="@asset('images/videos/' . $video . '.mp4')" type="video/mp4">
                <source src="@asset('images/videos/' . $video . '.webm')" type="video/webm">
                Your browser does not support de video tag
            </video>
        </div>
    </a>
    @else
    <div class="video">
        <img class="image gallery_image" src="{{$object['image']}}" />
        <video class="thevideo gallery_image" loop muted>
            <source src="@asset('images/videos/' . $video . '.mp4')" type="video/mp4">
            <source src="@asset('images/videos/' . $video . '.webm')" type="video/webm">
            Your browser does not support de video tag
        </video>
    </div>
    @endif

</div>
@else
<div class="gallery_item-{{$key%2}} anim-on-click">
    @if($page->guid)
    <a class="item-click" href="{{$page->guid}}">
        <img class="gallery_image" src="{{$object['image']}}" />
    </a>
    @else
    <img class="gallery_image" src="{{$object['image']}}" />
    @endif
</div>

@endif