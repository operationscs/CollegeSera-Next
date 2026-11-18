'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getColleges } from '@/services/collegeService';

const SearchCollegesContext = createContext<any[] | null>(null);

export function SearchCollegesProvider({
  initialColleges,
  children,
}: {
  initialColleges: any[];
  children: React.ReactNode;
}) {
  return (
    <SearchCollegesContext.Provider value={initialColleges}>
      {children}
    </SearchCollegesContext.Provider>
  );
}

let cachedClientColleges: any[] | null = null;
let inflightPromise: Promise<any[]> | null = null;

export function useSearchColleges(propColleges?: any[]): any[] {
  const ctxColleges = useContext(SearchCollegesContext);
  const resolvedInitial = propColleges ?? ctxColleges ?? cachedClientColleges;
  const [colleges, setColleges] = useState<any[]>(resolvedInitial ?? []);

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
