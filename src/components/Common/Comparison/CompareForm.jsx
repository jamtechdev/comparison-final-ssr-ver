import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import SearchList from "../../Search/SearchList";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { addCompareProduct } from "@/redux/features/compareProduct/compareProSlice";
import CompareSearchList from "@/components/Search/CompareSearchList";
import { useSelector } from "react-redux";
export default function CompareForm({ location, handelCategoryForOffenProduct, handelCloseCompareModel }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const reduxData = useSelector((state) => state.comparePro.compareProduct)[0];
    const [formFields, setFormFields] = useState({
        productFirst: reduxData?.productFirst,
        productSecond: reduxData?.productSecond,
        productThird: reduxData?.productThird,
        category: reduxData?.category,
        location: reduxData?.location ? reduxData?.location : location
    });
    const [isFocusedProductFirst, setFocusedProductFirst] = useState(false);
    const [isFocusedProductSecond, setFocusedProductSecond] = useState(false);
    const [isFocusedProductThird, setFocusedProductThird] = useState(false);

    const handleFieldChange = (fieldName, value) => {
        // Update the state based on the field being changed
        setFormFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
        }));

    };
    const handleChildValue = (inputPostion, data) => {
        setFocusedProductFirst(false)
        setFocusedProductSecond(false)
        setFocusedProductThird(false)
        setFormFields((prevFields) => ({
            ...prevFields,
            [inputPostion]: data,
        }));
    }
    const handelComparison = () => {
        const isValidObject = (fieldValue) => typeof fieldValue === 'object' && Object.keys(fieldValue).length > 0;
        const isProductFieldsValid = isValidObject(formFields.productFirst) && isValidObject(formFields.productSecond);
        if (isProductFieldsValid) {
            const permalinksArray = [
                formFields.productFirst,
                formFields.productSecond,
                formFields.productThird,
            ].filter(product => product && product.permalink !== '');

            const categoryInURL = formFields?.productFirst?.category_url;
            const sortedPermalinksArray = [...permalinksArray].sort((a, b) => a.permalink.localeCompare(b.permalink));
            const permalinks = sortedPermalinksArray.map(item => item.permalink);
            const permalinkSlug = permalinks.join('-vs-');
            dispatch(addCompareProduct(formFields))
            handelCloseCompareModel()
            router.push(`/${categoryInURL}/${permalinkSlug}`, undefined, { scroll: false });
        }
    }
    const handelCategoryUpdate = (id) => {
        setFormFields((prevFields) => ({
            ...prevFields,
            ["category"]: id,
        }));

        if (location === "ON_MODEL") { handelCategoryForOffenProduct(id); handelCloseCompareModel() }
    }
    const handleBlur = () => {
        setTimeout(() => {
            setFocusedProductFirst(false);
            setFocusedProductSecond(false);
            setFocusedProductThird(false);
        }, 200);
    };
    // useEffect(() => {
    //     console.log(reduxData, ">>>");
    // }, []);
    return (
        <>
            <div className="compare-section">
                <div className="compare-section-img">
                    <Image src="/images/vs.svg" width={40} height={40} alt="" />
                    <Image src="/images/vs.svg" width={40} height={40} alt="" />
                </div>
                <div className="compare-section-form">
                    <div className="position-relative w-100">
                        <Form.Control
                            type="text"
                            placeholder={"1st product..."}
                            onBlur={handleBlur}
                            value={typeof formFields.productFirst === 'string'
                                ? formFields.productFirst
                                : formFields.productFirst?.name || ''}
                            onFocus={() => setFocusedProductFirst(true)}
                            onChange={(e) => handleFieldChange('productFirst', e.target.value.trim())}

                        />
                        {formFields.productFirst && isFocusedProductFirst && (
                            <CompareSearchList
                                isFocused={isFocusedProductFirst}
                                setIsFocused={isFocusedProductFirst}
                                onSendValue={handleChildValue}
                                searchedKeyWord={formFields.productFirst}
                                inputPostion={"productFirst"}
                                handelCategoryUpdate={handelCategoryUpdate}
                            >

                            </CompareSearchList>
                        )}
                    </div>
                    <div className="position-relative w-100">
                        <Form.Control
                            type="text"
                            placeholder="2nd product..."
                            onBlur={handleBlur}
                            value={typeof formFields.productSecond === 'string'
                                ? formFields.productSecond
                                : formFields.productSecond?.name || ''}
                            onFocus={() => setFocusedProductSecond(true)}
                            onChange={(e) => handleFieldChange('productSecond', e.target.value.trim())}
                            disabled={formFields.productFirst ? false : true}
                        />
                        {formFields.productSecond && isFocusedProductSecond && (
                            <CompareSearchList
                                isFocused={isFocusedProductSecond}
                                setIsFocused={isFocusedProductSecond}
                                onSendValue={handleChildValue}
                                searchedKeyWord={formFields.productSecond}
                                inputPostion={"productSecond"}
                                category_id={formFields.category}
                            >

                            </CompareSearchList>
                        )}
                    </div>
                    <div className="position-relative">
                        <Form.Control
                            type="text"
                            placeholder="3rd product... (optional)"
                            onFocus={() => setFocusedProductThird(true)}
                            onBlur={handleBlur}
                            value={typeof formFields.productThird === 'string'
                                ? formFields.productThird
                                : formFields.productThird?.name || ''}
                            onChange={(e) => handleFieldChange('productThird', e.target.value.trim())}
                            disabled={formFields.productSecond ? false : true}
                        />
                        {formFields.productThird && isFocusedProductThird && (
                            <CompareSearchList
                                isFocused={isFocusedProductThird}
                                setIsFocused={isFocusedProductThird}
                                onSendValue={handleChildValue}
                                searchedKeyWord={formFields.productThird}
                                inputPostion={"productThird"}
                                category_id={formFields.category}
                            >

                            </CompareSearchList>
                        )}
                    </div>
                    <Button onClick={handelComparison} className="site_main_btn">
                        Compare
                    </Button>
                </div>
            </div>
        </>
    );
}