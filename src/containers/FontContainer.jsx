import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAlign, setFont } from "../slice";
import AlignLeftIcon from "../icons/AlignLeftIcon";
import AlignCenterIcon from "../icons/AlignCenterIcon";
import AlignRightIcon from "../icons/AlignRightIcon";
import FontContainerLayout from "../layouts/FontContainerLayout";
import FontColorSelector from "../presentationals/FontColorSelector";
import FontSizeSelector from "../presentationals/FontSizeSelector";
import IconButton from "../presentationals/IconButton";

export default function FontContainer() {
	const fontSizeRef = useRef();
	const [fontDropdown, setFontDropdown] = useState({ size: false, color: false });
	const fontInfo = useSelector(state => state.fontInfo);
	const dispatch = useDispatch();

	const handleFontSizeChange = e => {
		const MAX_FONT_SIZE = 99;
		const value = e.target.value;
		const size = value < MAX_FONT_SIZE ? value : MAX_FONT_SIZE;

		dispatch(setFont({ ...fontInfo, size }));
	};

	const handleFontSizeItemClick = size => () => {
		dispatch(setFont({ ...fontInfo, size }));
		setFontDropdown({ ...fontDropdown, size: false });
	};

	const handleFontSizeInputClick = () => {
		setFontDropdown({ ...fontDropdown, size: true });
	};

	const handleFontColor = e => {
		dispatch(setFont({ ...fontInfo, color: e.target.value }));
	};

	const handleAlignment = align => () => {
		dispatch(setAlign(align));
	};

	useEffect(() => {
		const outsideClickEvent = ({ target }) => {
			if (!fontSizeRef.current.contains(target)) {
				setFontDropdown(prevState => ({ ...prevState, size: false }));
			}
			}
		};

		window.addEventListener("click", outsideClickEvent);
		return () => window.removeEventListener("click", outsideClickEvent);
	});

	return (
		<FontContainerLayout>
			<FontSizeSelector
				fontSizeRef={fontSizeRef}
				fontSize={fontInfo.size}
				fontDropdown={fontDropdown}
				handleFontSizeChange={handleFontSizeChange}
				handleFontSizeItemClick={handleFontSizeItemClick}
				handleFontSizeInputClick={handleFontSizeInputClick}
			/>
			<FontColorSelector
				onChange={handleFontColor}
				fontColor={fontInfo.color}
			/>
			<IconButton
				onClick={handleAlignment("left")}
				icon={<AlignLeftIcon />}
				isHover={true} />
			<IconButton
				onClick={handleAlignment("center")}
				icon={<AlignCenterIcon />}
				isHover={true} />
			<IconButton
				onClick={handleAlignment("right")}
				icon={<AlignRightIcon />}
				isHover={true} />
		</FontContainerLayout>
	);
}
