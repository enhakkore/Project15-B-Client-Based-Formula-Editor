import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	setLatexInput,
	setCustomFormValue,
	removeAllRecentItems,
	openConfirmModal,
	openPromptModal,
	setBookmarkItem,
} from "../slice";
import { RECENT_TAB, CUSTOM_COMMAND_TAB } from "../constants/sidebarTab";
import CharacterContainerLayout from "../layouts/CharacterContainerLayout";
import SideTabItemLayout from "../layouts/SideTabItemLayout";
import ListItem from "../presentationals/ListItem";
import EmptyItem from "../presentationals/EmptyItem";
import CharacterListItem from "../presentationals/CharacterListItem";
import Filter from "../presentationals/Filter";
import DirectoryTitle from "../presentationals/DirectoryTitle";

export default function RecentContainer({ setTabState }) {
	const { recentItems } = useSelector(state => state);
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState("");

	const handleBookmarkButtonClick = (id, isBookmark) => () => {
		if (isBookmark) {
			dispatch(setBookmarkItem({ id, isBookmark: false }));
			return;
		}
		dispatch(openPromptModal({ tabId: RECENT_TAB, id }));
	};

	const handleCustomButtonClick = latex => () => {
		dispatch(setCustomFormValue({ state: true, name: "등록", command: "", latex }));
		setTabState(CUSTOM_COMMAND_TAB);
	};

	const handleDeleteButtonClick = id => () => {
		dispatch(openConfirmModal({ tabId: RECENT_TAB, id }));
	};

	const handleFormulaClick = latex => () => {
		dispatch(setLatexInput(latex));
	};

	const handleDeleteAllClick = () => {
		if (confirm("모든 최근 수식을 삭제하시겠습니까?")) {
			dispatch(removeAllRecentItems());
		}
	};

	const handleFilter = ({ target }) => {
		const inputValue = target.value;

		if (!inputValue) {
			setSearchTerm("");
			return;
		}
		setSearchTerm(inputValue);
	};

	return (
		<>
			<Filter onChange={handleFilter}/>
			<CharacterContainerLayout>
				<DirectoryTitle
					title="최근 수식 목록"
					isOpen={true}
					onClickDeleteButton={handleDeleteAllClick}
				/>
				{recentItems.length ?
					recentItems
						.filter(item => item.date.includes(searchTerm))
						.map(item =>
							<SideTabItemLayout key={item.id}>
								<CharacterListItem
									item={{ ...item, symbol: "Σ", name: item.date }}
									onClick={handleFormulaClick}
								/>
								<ListItem
									latex={item.latex}
									bookmarkOnClick={handleBookmarkButtonClick(item.id, item.isBookmark)}
									customOnClick={handleCustomButtonClick(item.latex)}
									deleteOnClick={handleDeleteButtonClick(item.id)}
									intoLatexFieldOnClick={handleFormulaClick(item.latex)}
									isBookmark={item.isBookmark}
								/>
							</SideTabItemLayout>,
						) :
					<EmptyItem content={"최근 저장한 수식이 없습니다"}/>}
			</CharacterContainerLayout>
		</>
	);
}

