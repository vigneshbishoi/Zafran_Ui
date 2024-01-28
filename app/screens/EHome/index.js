import {
    CategoryIconSoft,
    HeaderAnimated,
    ModalFilter,
    ProductGrid1,
    ProductGrid2,
    SafeAreaView,
    ShopCard1,
    Text,
    TextInput,
    HeaderLargeTitleStore,
    HeaderLargeTitleBadge,
} from "@components";
import { BaseColor, BaseStyle, useTheme,Images } from "@config";
import {
    ECategories,
    EFeaturedShop,
    EPopulars,
    EYourStores,
    EWishlistHome,
} from "@data";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, ScrollView, TouchableOpacity, View } from "react-native";
import { BaseSetting } from "../../config/setting";
import styles from "./styles";

const HeaderLine = ({ style = {}, title = "", onPress = () => {} }) => {
    const { t } = useTranslation();

    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    alignItems: "center",
                },
                style,
            ]}
        >
            <Text title3 style={{ flex: 1 }}>
                {title}
            </Text>
            <TouchableOpacity onPress={onPress}>
                <Text body2 accentColor>
                    {t("see_all")}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const Home = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [stores, setStores] = useState([]);
    const [categories, setCategories] = useState([]);
    const [businessList, setBusinessList] = useState([]);
    const [storeChoosed, setStoreChoosed] = useState({});
    const scrollY = useRef(new Animated.Value(0)).current;

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false,
        }
    );

    const onChangeStore = () => {
        let storeChoosed = {};
        for (const store of stores) {
            if (store.checked) {
                storeChoosed = store;
                break;
            }
        }
        setStoreChoosed(storeChoosed);
        setModalVisible(false);
    };

    const onSelectStore = (store) => {
        const stores = EYourStores.map((item) => {
            return {
                ...item,
                checked: item.value == store.value,
            };
        });
        setStores(stores);
    };

    useEffect(() => {
            setLoading(false);
            getStores();
            getBusinessTypes();
            getBusinessList();
    },[]);
    
    const getStores = useCallback(async () => {
        try {
            const response = await fetch(
                `${BaseSetting.base_Url}/get/region_of_branches`,
                {
                    method: 'GET'
                },
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const resData = await response.json();
            if (resData.status == 'success') {
                const cities = resData.message;
                let arr = [];
                cities.map(city => {
                    if (city !== false) {
                        let cityObj = {
                            value: city,
                            icon: "sort-amount-up",
                            text: city,
                            image: "",
                        }

                        arr.push(cityObj)
                    }
                })
                setStores(arr)
                setStoreChoosed(arr[0])
          }else{
            alert('User Already Exists')
          }
        } catch (err) {
          setLoading(false);

        //   navigation.navigate('OTP')
        }
    }
    )
    const getBusinessTypes = useCallback(async () => {
        try {
            const response = await fetch(
                `${BaseSetting.base_Url}/get/business_type`,
                {
                    method: 'GET'
                },
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            let  resData = await response.json();
            resData= {"status": "success", "message": [{"id": 1, "name": "Food & bavrages", "company_type_tag_ids": [1]}]}
            if (resData.status == 'success') {
                console.log(resData)
                resData.message.map(cat=>{
                        cat['screen']= 'place'
                        cat['image'] = Images.productCategory01,
                        cat['icon'] = "star",
                        cat['title'] = cat.name
                        cat['color'] = BaseColor.orangeColor
                      })
                      console.log('resData.message',resData.message)
                      setCategories(resData.message)
            } else {
           
            }
        } catch (err) {
            setLoading(false);
        }
    }
    )

    const getBusinessList = useCallback(async ()=>{
        try {
            const response = await fetch(
                `${BaseSetting.base_Url}/get/business_type`,
                {
                    method: 'GET'
                },
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            let  resData = await response.json();
            resData= {"status": "success", "message": [{"id": 2, "name": "My Company (Chicago)", "name_ar": "\u0634\u0631\u0643\u062a\u064a (\u0634\u064a\u0643\u0627\u063a\u0648)", "street": "90 Streets Avenue", "street2": false, "city": "Chicago", "state_id": [22, "Illinois (US)"], "country_id": [233, "United States"], "zip": "60610", "default_branch_id": [1, "Rajkot"], "company_type_id": [1, "Food & bavrages"], "company_type_tag_ids": [1]}, {"id": 3, "name": "SA Company", "name_ar": false, "street": "Al Amir Mohammed Bin Abdul Aziz Street", "street2": false, "city": "\u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629", "state_id": false, "country_id": [192, "Saudi Arabia"], "zip": "42317", "default_branch_id": false, "company_type_id": false, "company_type_tag_ids": []}, {"id": 1, "name": "My Company (San Francisco)", "name_ar": false, "street": "250 Executive Park Blvd, Suite 3400", "street2": false, "city": "San Francisco", "state_id": [13, "California (US)"], "country_id": [192, "Saudi Arabia"], "zip": "94134", "default_branch_id": false, "company_type_id": false, "company_type_tag_ids": []}]}
            if (resData.status == 'success') {
                console.log(resData)
                resData.message.map(businss=>{
                        businss['image']= Images.branchApple
                        businss['title']= businss.name,
                        businss['rating']= 4.5,
                        businss['totalRating']= 5,
                        businss['description']= businss.name
                      })
                      console.log('resData.message',resData.message)
                      setBusinessList(resData.message)
            } else {
           
            }
        } catch (err) {
            setLoading(false);
        }
    })

    const goCategory = (item = {}) => {
        navigation.navigate("ECategory", { item: item });
    };

    const goToCompanyList = (item = {}) => {
        navigation.navigate("News");
    };

    const goShop = (item) => {
        navigation.navigate("EProductStoreProfile", { item: item });
    };

    const goProductDetail = (item) => {
        navigation.navigate("EProductDetail", { item: item });
    };

    const goSearch = () => {
        navigation.navigate("ESearchHistory");
    };

    const goProducts = () => {
        navigation.navigate("News");
    };

    const goProductsWishlist = () => {
        navigation.navigate("EWishlist");
    };

    const renderContent = () => {
        return (
            <View style={{ flex: 1 }}>
            <HeaderAnimated
                    scrollY={scrollY}
                    componentLeft={stores && stores.length>0 && <HeaderLargeTitleStore  storesData={stores}/>}
                    componentRight={
                        <HeaderLargeTitleBadge
                            onPress={() => navigation.navigate("ENotification")}
                        />
                    }
                    componentBottom={
                        <TouchableOpacity onPress={goSearch}>
                            <TextInput
                                autoCorrect={false}
                                placeholder={t("enter_keywords")}
                                value={search}
                                editable={false}
                                pointerEvents="none"
                            />
                        </TouchableOpacity>
                    }
                />

                <Animated.ScrollView
                    contentContainerStyle={[styles.paddingSrollView]}
                    onScroll={onScroll}
                >
                    <HeaderLine title={t("categories")} onPress={goCategory} />

                    <Text subhead grayColor style={{ marginTop: 4 }}>
                        {t("e_description_featured_shop")}
                    </Text>
                    {/*Not use FlatList in ScrollView */}
                    <ScrollView
                        contentContainerStyle={styles.paddingFlatList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {categories&&categories.length>0&&categories.map((item, index) => (
                            <CategoryIconSoft
                                loading={loading}
                                key={index.toString()}
                                title={item.title}
                                icon={item.icon}
                                style={{
                                    marginRight:
                                        index != ECategories.length - 1
                                            ? 20
                                            : 0,
                                }}
                                onPress={() => goToCompanyList()}
                            />
                        ))}
                    </ScrollView>

                    <Text title3 style={{ flex: 1, paddingTop: 20 }}>
                        {/* {t("e_featured_shop")} */}
                        Business
                    </Text>

                    <Text subhead grayColor style={{ marginTop: 4 }}>
                        {/* {t("e_description_featured_shop")} */}
                        Featured Business
                    </Text>

                    {/*Not use FlatList in ScrollView */}
                    <ScrollView
                        contentContainerStyle={styles.paddingFlatList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {businessList&&businessList.length>0&&businessList.map((item, index) => (
                            <ShopCard1
                                loading={loading}
                                onPress={goShop}
                                key={index.toString()}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                rating={item.rating}
                                totalRating={item.totalRating}
                                style={{
                                    marginRight:
                                        index == EFeaturedShop.length - 1
                                            ? 0
                                            : 10,
                                }}
                                isVerified={index == 0}
                            />
                        ))}
                    </ScrollView>

                    <HeaderLine
                        style={{ paddingTop: 20 }}
                        title={t("popular")}
                        onPress={goProducts}
                    />
                    {/*Not use FlatList in ScrollView */}
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {EPopulars.map((item, index) => (
                            <View
                                key={index.toString()}
                                style={{ width: "50%" }}
                            >
                                <ProductGrid1
                                    loading={loading}
                                    style={{
                                        width: "100%",
                                        paddingRight: index % 2 == 0 ? 10 : 0,
                                        paddingLeft: index % 2 != 0 ? 10 : 0,
                                    }}
                                    description={item.description}
                                    title={item.title}
                                    image={item.image}
                                    costPrice={item.costPrice}
                                    salePrice={item.salePrice}
                                    isFavorite={item.isFavorite}
                                    onPress={() => goProductDetail(item)}
                                />
                            </View>
                        ))}
                    </View>
                    <HeaderLine
                        style={{ paddingTop: 20 }}
                        title={t("product_wishlist")}
                        onPress={goProductsWishlist}
                    />
                    <ScrollView
                        contentContainerStyle={[styles.paddingFlatList]}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {EWishlistHome.map((item, index) => (
                            <ProductGrid2
                                style={{
                                    width: 155,
                                    marginRight: index != EWishlistHome.length - 1 ? 15 : 0,
                                }}
                                description={item.description}
                                title={item.title}
                                image={item.image}
                                costPrice={item.costPrice}
                                salePrice={item.salePrice}
                                onPress={() => {}}
                                isFavorite={item.isFavorite}
                                onPress={() => goProductDetail(item)}
                            />
                        ))}
                    </ScrollView>
                </Animated.ScrollView>
                {/* <ModalFilter
                    options={stores}
                    isVisible={modalVisible}
                    onSwipeComplete={() => {
                        setModalVisible(false);
                    }}
                    onApply={onChangeStore}
                    onSelectFilter={onSelectStore}
                /> */}
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                edges={["right", "top", "left"]}
            >
                {renderContent()}
            </SafeAreaView>
        </View>
    );
};

export default Home;
