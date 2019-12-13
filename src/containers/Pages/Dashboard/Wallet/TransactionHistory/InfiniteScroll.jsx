import React from 'react';
import PropTypes from 'prop-types';
import ReactInfiniteScroll from 'react-infinite-scroller';
import Loading from '../../../../../components/Loading';
import HistoryItem from './Item';

const InfiniteScroll = ({
	list, getTransactions, selectedCurrency, hasMore, pendingList,
}) => (
	<ReactInfiniteScroll
		pageStart={0}
		loadMore={() => getTransactions()}
		hasMore={hasMore}
		loader={<Loading key={0} />}
		initialLoad
		threshold={25}
		useWindow={false}
	>
		{
			pendingList.map((item, index) => (
				<HistoryItem
					key={item.hash}
					isPending
					item={item}
					selectedCurrency={selectedCurrency}
					index={index}
				/>
			))
		}
		{
			list.map((item, index) => (
				<HistoryItem
					key={item.transaction_hash ? `transaction_hash-${item.transaction_hash}-${item.log_index}` : `${item.hash}-${item.internal ? 'int' : ''}`}
					isPending={false}
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
	pendingList: PropTypes.array,
	hasMore: PropTypes.bool,
	selectedCurrency: PropTypes.string.isRequired,
	getTransactions: PropTypes.func.isRequired,
};

InfiniteScroll.defaultProps = {
	list: [],
	pendingList: [],
	hasMore: false,
};

export default InfiniteScroll;
