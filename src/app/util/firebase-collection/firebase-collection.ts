import { FirebaseApp } from "@angular/fire/app";
import { collection, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, getFirestore, Query, query, QuerySnapshot, setDoc } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";

export class FirebaseCollection<T> {
    private readonly db: Firestore=getFirestore(this.firebaseApp);
    readonly collection=collection(this.db, this.collectionName);
    readonly list$: BehaviorSubject<T[]>=new BehaviorSubject<T[]>([]);

    constructor(
        private readonly firebaseApp: FirebaseApp,
        public readonly collectionName: string,
        public readonly objectToTypeFunction: (data: DocumentData|undefined)=>T,
    )
    {
    }

    refreshList(): void
    {
        this.query(this.all());
    }

    query(
        query: Query<DocumentData>, 
        resultConsumer: (result: T[])=>void = result=>this.list$.next(result), 
        errorConsumer?: (err: Error)=>void
        ): void
    {
        getDocs(query)
            .then(querySnapshot=>this.applyResult(querySnapshot, resultConsumer))
            .catch(err=>{if(errorConsumer) errorConsumer(err)});
    }

    all(): Query<DocumentData>
    {
        return query(this.collection);
    }


    get(key: any): Promise<T>
    {
        return getDoc(this.docRef(key))
            .then(documentSnapshot=>this.objectToTypeFunction(documentSnapshot.data()));
    }

    set(key: any, doc: any): Promise<void>
    {
        const docRef=this.docRef(key);
        const data={...doc};
        return setDoc(docRef, data);
    }

    del(key: any): Promise<void>
    {
        return deleteDoc(this.docRef(key));
    }

    private docRef(id: any): DocumentReference<DocumentData>
    {
        return doc(this.db, this.collectionName, id);
    }

    private applyResult(querySnapshot: QuerySnapshot<DocumentData>, resultConsumer: (result: T[])=>void): void
    {
        const result: T[]=[];
        querySnapshot.forEach(queryDocumentSnapshot=>
        {
            const data=queryDocumentSnapshot.data();
            const t: T=this.objectToTypeFunction(data);
            result.push(t);
        });
        resultConsumer(result);
    }



}
