import React from "react";

const Item = ({
	link,
	width,
	height,
	title,
	url,
	channelLink,
	channelTitle,
}) => (<div className="item">
	<a href={link} target="_blank">
		<span className="image-container">
			<img
				data-width={width}
				data-height={height}
				src={url}
				alt="thumbnail"
			/>
		</span>
		<span className="title">{title}</span>
	</a>
	<a href={channelLink} target="_blank">
		<span className="channel">{channelTitle}</span>
	</a>
</div>);

export default Item;
