import IPostResponse from '@/models/Responses/IPostResponse';
import { Commit } from 'vuex'
export interface CommitFunction {
    commit: Commit;
}

export interface CommitStateFunction<T> {
    posts: T;
}
export const types = {
    SET_POSTS: 'setPosts',
};

export interface IPostState {
    posts: IPostState[]
}

const state = {
    posts: [] as IPostResponse[],
};

const getters = {
    posts: (state: IPostState) => state.posts,
};

const actions = {
    setPosts({ commit }: CommitFunction, data: IPostState[]) {
        commit(types.SET_POSTS, data);
    },
};

const mutations = {
    [types.SET_POSTS](state: CommitStateFunction<IPostResponse[]>, data: IPostResponse[]) {
        state.posts = data;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};