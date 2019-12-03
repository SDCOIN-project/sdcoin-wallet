import React from 'react';
import PropTypes from 'prop-types';
import ReactInfiniteScroll from 'react-infinite-scroller';
import Loading from '../../../../../components/Loading';
import HistoryItem from './Item';

const InfiniteScroll = ({
	list, getTransactions, selectedCurrency, hasMore, parent,
}) => (
	<ReactInfiniteScroll
		pageStart={0}
		loadMore={() => getTransactions()}
		hasMore={hasMore}
		loader={<Loading key={0} />}
		initialLoad={false}
		getScrollParent={parent}
		threshold={25}
	>
		{
			list.map((item, index) => (
				<HistoryItem
					key={item.hash || item.transaction_hash}
					item={item}
					selectedCurrency={selectedCurrency}
					index={index}
				/>
			))
		}
	</ReactInfiniteScroll>
);

InfiniteScroll.propTypes = {
	list: PropTypes.array,
	hasMore: PropTypes.bool,
	selectedCurrency: PropTypes.string.isRequired,
	parent: PropTypes.func.isRequired,
	getTransactions: PropTypes.func.isRequired,
};

InfiniteScroll.defaultProps = {
	list: [],
	hasMore: false,
};

export default InfiniteScroll;
