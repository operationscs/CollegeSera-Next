'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getColleges } from '@/services/collegeService';
import type { DatabaseCollege } from '@/types/database';
import type { SearchCollegesProviderProps } from '@/types/search';

const SearchCollegesContext = createContext<DatabaseCollege[] | null>(null);

export function SearchCollegesProvider({ initialColleges, children }: SearchCollegesProviderProps) {
  return (
    <SearchCollegesContext.Provider value={initialColleges}>
      {children}
    </SearchCollegesContext.Provider>
  );
}

let cachedClientColleges: DatabaseCollege[] | null = null;
let inflightPromise: Promise<DatabaseCollege[]> | null = null;

export function useSearchColleges(propColleges?: DatabaseCollege[]): DatabaseCollege[] {
  const ctxColleges = useContext(SearchCollegesContext);
  const resolvedInitial = propColleges ?? ctxColleges ?? cachedClientColleges;
  const [colleges, setColleges] = useState<DatabaseCollege[]>(resolvedInitial ?? []);

  useEffect(() => {
    if (propColleges && propColleges.length > 0) {
      setColleges(propColleges);
      return;
    }
    if (ctxColleges && ctxColleges.length > 0) {
      setColleges(ctxColleges);
      return;
    }
    if (cachedClientColleges) {
      setColleges(cachedClientColleges);
      return;
    }
    if (!inflightPromise) {
      inflightPromise = getColleges()
        .then((data) => {
          cachedClientColleges = data || [];
          return cachedClientColleges;
        })
        .catch(() => []);
    }
    inflightPromise.then((data) => {
      setColleges(data);
    });
  }, [propColleges, ctxColleges]);

  return propColleges ?? ctxColleges ?? colleges;
}
