import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../store';
import { fetchTemplates } from '../store/Thunk/templateAction';
import useAxiosPrivate from './useAxiosPrivate';

interface UseTemplatesProps {
    page?: number;
    limit?: number;
    projectTitle?: string;
    tags?: string[];
    status?: string;
}

const useTemplates = (props?: UseTemplatesProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const axiosPrivate = useAxiosPrivate();
    
    const templates = useSelector((state: RootState) => state.templateState.templates);
    const pagination = useSelector((state: RootState) => state.templateState.pagination);
    const loading = useSelector((state: RootState) => state.templateState.loading);

    useEffect(() => {
        dispatch(fetchTemplates({
            axiosPrivate,
            page: props?.page,
            limit: props?.limit,
            projectTitle: props?.projectTitle,
            tags: props?.tags,
            status: props?.status
        }));
    }, [dispatch, axiosPrivate, props?.page, props?.limit, props?.projectTitle, props?.tags, props?.status]);

    return {
        templates,
        pagination,
        loading,
        refetch: (p0: { page: number; limit: number; projectTitle: string; tags: string[] | undefined; }) => dispatch(fetchTemplates({ axiosPrivate, ...p0 }))
    };
};

export default useTemplates;