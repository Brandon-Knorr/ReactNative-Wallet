import { useCallback, useState } from 'react';
import { Alert, Platform } from 'react-native';

const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const API_URL = `http://${ HOST }:5001/api`;

export const useTransactions = ( userId ) =>
{
    const [ transactions, setTransactions ] = useState( [] );
    const [ summary, setSummary ] = useState( { income: 0, expenses: 0, balance: 0 } );
    const [ isLoading, setIsLoading ] = useState( true );

    const fetchTransactions = useCallback( async () =>
    {
        if ( !userId ) return;
        try
        {
            const response = await fetch( `${ API_URL }/transactions/${ userId }` );
            const data = await response.json();
            // backend returns { transactions: [...] }
            setTransactions( data.transactions ?? data );
        } catch ( error )
        {
            console.error( "Error fetching transactions:", error );
        }
    }, [ userId ] );

    const fetchSummary = useCallback( async () =>
    {
        if ( !userId ) return;
        try
        {
            const response = await fetch( `${ API_URL }/transactions/summary/${ userId }` );
            const data = await response.json();
            // backend returns { balance, income, expenses }
            setSummary( data );
        } catch ( error )
        {
            console.error( "Error fetching Summary:", error );
        }
    }, [ userId ] );

    const loadData = useCallback( async () =>
    {
        if ( !userId ) return;

        setIsLoading( true );

        try
        {
            await Promise.all( [ fetchTransactions(), fetchSummary() ] );
        } catch ( error )
        {
            console.error( "Error loading data:", error );
        } finally
        {
            setIsLoading( false );
        }
    }, [ fetchTransactions, fetchSummary, userId ] );

    const deleteTransaction = async ( id ) =>
    {
        try
        {
            const response = await fetch( `${ API_URL }/transactions/${ id }`, {
                method: 'DELETE',
            } );

            if ( !response.ok ) throw new Error( 'Failed to delete transaction' );

            // Refresh transactions and summary after deletion
            await loadData();

            Alert.alert( 'Success', 'Transaction deleted successfully' );
        } catch ( error )
        {
            console.error( 'Error deleting transaction:', error );
            Alert.alert( 'Error', 'Failed to delete transaction' );
        }
    };

    return { transactions, summary, isLoading, loadData, deleteTransaction };
};