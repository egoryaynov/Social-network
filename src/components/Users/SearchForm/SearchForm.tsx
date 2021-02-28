import React from 'react';
import styles from '../Users.module.scss';
import {FormikProps, useFormik} from "formik";
import {debounce} from 'lodash';
import {FilterType} from "../../../types/types";

type ValuesType = {
    term: string
    friend: "all" | "true" | "false"
}
type PropsType = {
    onChangeFilter: (filter: FilterType) => void
}

const prepareFriendForRequest: (friend: string) => boolean | null = (friend) => {
    switch (friend) {
        case "all":
            return null;
        case "true":
            return true
        case "false":
            return false;
        default:
            return null
    }
}

const SearchForm: React.FC<PropsType> = React.memo(({onChangeFilter}) => {
    const searchRef = React.createRef<HTMLInputElement>();

    const formik: FormikProps<ValuesType> = useFormik<ValuesType>({
        initialValues: {
            term: '',
            friend: "all"
        },
        onSubmit: (values) => {
            const termForRequest = values.term.trim().length > 0 ? values.term : null
            const friendForRequest: boolean | null = prepareFriendForRequest(values.friend)

            onChangeFilter({term: termForRequest, friend: friendForRequest});
        }
    });

    const searchDebounced = React.useCallback(debounce(() => formik.submitForm(), 700), []);
    const onChangeSelect = React.useCallback((event) => {
        formik.handleChange(event)

        formik.submitForm().then()
    }, []);

    React.useEffect(() => {
        searchRef.current?.addEventListener('input', searchDebounced);

        return () => {
            searchRef.current?.removeEventListener('input', searchDebounced);
        }
    }, [])

    return (
        <div className={styles.searchWrapper}>
            <input
                ref={searchRef}
                placeholder="Введите имя"
                type="text"
                name="term"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.term}
            />
            <select
                name="friend"
                onChange={onChangeSelect}
                value={formik.values.friend}
                onBlur={formik.handleBlur}
            >
                <option value="all" label="All"/>
                <option value="true" label="Only followed"/>
                <option value="false" label="Only unfollowed"/>
            </select>
        </div>
    );
});

export default SearchForm;
