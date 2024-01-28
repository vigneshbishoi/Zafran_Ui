const getBusinessTypes = (async () => {
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