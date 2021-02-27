import React from 'react';
import styles from '../Users.module.scss';
import {FormikProps, useFormik} from "formik";
import {debounce} from 'lodash';
import {requestUsersType} from "../types";
import {requestUsers} from "../../../redux/usersReducer";
import {useDispatch} from "react-redux";

type ValuesType = {
    term: string
}
type PropsType = {
    currentPage: number
    pageSize: number
    onSearch: (newTerm: string) => void
}
const SearchForm: React.FC<PropsType> = ({currentPage, pageSize, onSearch}) => {
    const searchRef = React.createRef<HTMLInputElement>();
    const dispatch = useDispatch();

    const formik: FormikProps<ValuesType> = useFormik<ValuesType>({
        initialValues: {
            term: ''
        },
        onSubmit: (values) => {
            const termForRequest = values.term.trim().length > 0 ? values.term : null
            onSearch(termForRequest as string)

            dispatch(requestUsers(currentPage, pageSize, termForRequest));
        }
    });

    const searchDebounced = React.useCallback(debounce(() => formik.submitForm(), 1000), []);

    React.useEffect(() => {
        searchRef.current?.addEventListener('input', searchDebounced);
    }, [searchRef])

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
        </div>
    );
};

export default SearchForm;
