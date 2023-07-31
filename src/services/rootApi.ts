import axios, { AxiosInstance } from "axios";

// Interfaces
import { Paper, PaperWithoutId } from "../interfaces/paper";

interface RootApiInterface {
  service: AxiosInstance;
}

class RootApi implements RootApiInterface {
  service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: import.meta.env.VITE_ROOT_API,
    });
  }

  public async get(): Promise<Array<Paper>> {
    const { data } = await this.service.get("papers");
    return data;
  }

  public async create(payload: PaperWithoutId): Promise<Paper> {
    const { data } = await this.service.post("papers", payload);
    return data;
  }

  public async update(id: string, payload: Paper): Promise<Paper> {
    const { data } = await this.service.put(`papers/${id}`, payload);
    return data;
  }

  public async delete(id: string): Promise<boolean> {
    const { data } = await this.service.delete(`papers/${id}`);
    return data;
  }
}

export const rootApi = new RootApi();
