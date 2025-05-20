import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, Pagination } from "./project-slice";

interface User {
    _id: string;
    email: string;
}

interface Template {
    _id: string;
    project: Project;
    likes: User[];
    dislikes: User[];
    createdAt: string;
    __v: number;
    likeCount: number;
    dislikeCount: number;
    id: string;
}

interface TemplateState {
    templates: Template[];
    pagination: Pagination;
    loading: boolean;
}

const initialState: TemplateState = {
    templates: [],
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    },
    loading: true
};

const templateSlice = createSlice({
    name: "template",
    initialState,
    reducers: {
        setTemplates(state, action: PayloadAction<Template[]>) {
            state.templates = action.payload;
            state.loading = false;
        },
        addTemplate(state, action: PayloadAction<Template>) {
            state.templates.unshift(action.payload);
        },
        removeTemplate(state, action: PayloadAction<string>) {
            state.templates = state.templates.filter(
                template => template._id !== action.payload
            );
        },
        updateTemplate(state, action: PayloadAction<Template>) {
            const index = state.templates.findIndex(
                template => template._id === action.payload._id
            );
            if (index !== -1) {
                state.templates[index] = action.payload;
            }
        },
        setPagination(state, action: PayloadAction<Pagination>) {
            state.pagination = action.payload;
        },
        toggleLike(state, action: PayloadAction<{ templateId: string; user: User }>) {
            const template = state.templates.find(t => t._id === action.payload.templateId);
            if (template) {
                const userIndex = template.likes.findIndex(u => u._id === action.payload.user._id);
                if (userIndex === -1) {
                    // Remove from dislikes if present
                    const dislikeIndex = template.dislikes.findIndex(
                        u => u._id === action.payload.user._id
                    );
                    if (dislikeIndex !== -1) {
                        template.dislikes.splice(dislikeIndex, 1);
                        template.dislikeCount--;
                    }
                    // Add to likes
                    template.likes.push(action.payload.user);
                    template.likeCount++;
                } else {
                    // Remove from likes
                    template.likes.splice(userIndex, 1);
                    template.likeCount--;
                }
            }
        },
        toggleDislike(state, action: PayloadAction<{ templateId: string; user: User }>) {
            const template = state.templates.find(t => t._id === action.payload.templateId);
            if (template) {
                const userIndex = template.dislikes.findIndex(
                    u => u._id === action.payload.user._id
                );
                if (userIndex === -1) {
                    // Remove from likes if present
                    const likeIndex = template.likes.findIndex(
                        u => u._id === action.payload.user._id
                    );
                    if (likeIndex !== -1) {
                        template.likes.splice(likeIndex, 1);
                        template.likeCount--;
                    }
                    // Add to dislikes
                    template.dislikes.push(action.payload.user);
                    template.dislikeCount++;
                } else {
                    // Remove from dislikes
                    template.dislikes.splice(userIndex, 1);
                    template.dislikeCount--;
                }
            }
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    }
});

export const templateActions = templateSlice.actions;
export default templateSlice.reducer;