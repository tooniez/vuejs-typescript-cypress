import { AxiosResponse } from 'axios';
import $api from '../../api/api';
import IPostResponse from '@/models/Responses/IPostResponse';

export default class PostsService {
    static getPosts(): Promise<AxiosResponse<any[]>> {
        return $api.get<IPostResponse[]>('/posts');
    }

    static deletePost(id: number): Promise<AxiosResponse<any[]>> {
        return $api.delete<any[]>(`/posts/${id}`);
    }

    static addPost(post: IPostResponse): Promise<any> {
        return $api.post<any>('/posts', post);
    }

    static editPost(id: number): Promise<AxiosResponse<any[]>> {
        return $api.put<any[]>(`/posts/${id}`);
    }
}