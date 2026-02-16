import { ValidationStatus } from '../components/BarreProgression';

export interface MediaFile {
  type: 'photo' | 'audio' | 'video';
  url: string;
  name: string;
}

export interface Contribution {
  id: string;
  nomLocal: string;
  nomScientifique: string;
  pathologies: string[];
  modesPreparation: string;
  dosages: string;
  autreInfos: string;
  contraindications: string;
  media: MediaFile[];
  geolocalisation?: {
    latitude: number;
    longitude: number;
    zoneManuelle?: string;
    village?: string;
    commune?: string;
  };
  validationStatus: ValidationStatus;
  dateCreation: string;
  dateModification: string;
}

export interface User {
  id: string;
  nom: string;
  email: string;
  contributions: Contribution[];
}

const STORAGE_KEY = 'savoirs_burkina_user';

export const storageUtils = {
  // Get current user
  getUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  },

  // Initialize or get user
  initUser(nom: string, email: string): User {
    const existingUser = this.getUser();
    if (existingUser) return existingUser;

    const newUser: User = {
      id: Date.now().toString(),
      nom,
      email,
      contributions: [],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  },

  // Save user
  saveUser(user: User): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  },

  // Add contribution
  addContribution(contribution: Omit<Contribution, 'id' | 'dateCreation' | 'dateModification'>): Contribution {
    const user = this.getUser();
    if (!user) throw new Error('User not found');

    const newContribution: Contribution = {
      ...contribution,
      id: Date.now().toString(),
      dateCreation: new Date().toISOString(),
      dateModification: new Date().toISOString(),
    };

    user.contributions.push(newContribution);
    this.saveUser(user);
    return newContribution;
  },

  // Update contribution
  updateContribution(id: string, updates: Partial<Contribution>): void {
    const user = this.getUser();
    if (!user) throw new Error('User not found');

    const index = user.contributions.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Contribution not found');

    user.contributions[index] = {
      ...user.contributions[index],
      ...updates,
      dateModification: new Date().toISOString(),
    };
    this.saveUser(user);
  },

  // Delete contribution
  deleteContribution(id: string): void {
    const user = this.getUser();
    if (!user) throw new Error('User not found');

    user.contributions = user.contributions.filter(c => c.id !== id);
    this.saveUser(user);
  },

  // Get contribution by ID
  getContribution(id: string): Contribution | null {
    const user = this.getUser();
    if (!user) return null;
    return user.contributions.find(c => c.id === id) || null;
  },

  // Get all contributions
  getContributions(): Contribution[] {
    const user = this.getUser();
    if (!user) return [];
    return user.contributions;
  },

  // Clear all data
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
