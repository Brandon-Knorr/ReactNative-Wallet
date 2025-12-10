import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import
{
  useTransactions,
  isLoading,
  deleteTransaction,
} from "../../hooks/useTransactions";
import PageLoader from "@/components/PageLoader";
import { useEffect } from "react";
import { styles } from "../../assets/styles/home.styles";
import { Ionicons } from '@expo/vector-icons';

export default function Page ()
{
  const { user } = useUser();
  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions( user.id );

  useEffect( () =>
  {
    loadData();
  }, [ loadData ] );

  if ( isLoading ) return <PageLoader />;

  return (
    <View style={ styles.container }>
      <View style={ styles.content } >
        {/* HEADER */ }
        <View style={ styles.header }>
          {/* LEFT */ }
          <View style={ styles.headerLeft }>
            <Image source={ require( "../../assets/images/iconv1.png" ) }
              style={ styles.headerLogo }
              resizeMode="contain" />
            <View style={ styles.welcomeContainer }>
              <Text style={ styles.welcomeText }>BANK IT</Text>
              <Text style={ styles.usernameText }>
                { user?.emailAddresses[ 0 ]?.emailAddress.split( "@" )[ 0 ] }
              </Text>
            </View>
          </View>
          {/* RIGHT */ }
          <View style={ styles.headerRight }>
            <TouchableOpacity style={ styles.addButton } onPress={ () => router.push( "/create" ) }>
              <Ionicons name="add-circle" size={ 24 } color="#FFF" />
              <Text style={ styles.addButtonText }>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>

        </View>
        {/* RIGHT */ }
      </View>
    </View>
  );
}
