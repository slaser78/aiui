import React, {useState} from 'react'
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import GetAsset from './GetAsset';
import AssetScanDetails from './AssetScanDetails';
import AssetScore from './AssetScore';
import AssetVuln from './AssetVuln';
import AuditVuln from './AuditVuln';
import DeleteBulkAsset from "./DeleteBulkAsset";
import DeleteMit from "./DeleteMit";
import ElasticAssetUpload from './ElasticAssetUpload'
import ElasticDeviceTypesUpload from './ElasticDeviceTypesUpload'
import ElasticPatchUpload from './ElasticPatchUpload'
import ElasticStigUpload from './ElasticStigUpload'
import ImportAsset from './ImportAsset';
import ImportCalendar from './ImportCalendar';
import Lookup from './Lookup';
import Neo4j from './Neo4j'
import OpSystem from './OpSystem';
import PatchExport from './PatchExport';
import PatchVuln from './PatchVuln';
import Posture from './SetPosture';
import ScanDetails from './ScanDetails';
import AsvsFalse from './ASVSFalse';
import Subnets from './Subnets';
import SetSuspense from './SetSuspense';
import SetUpdateTemplate from './SetUpdateTemplate';
import GetVulnUpdate from './GetVulnUpdate';

export default function Maintenance () {
    const [getAsset, setGetAsset] = useState(false);
    const [assetScanDetails, setAssetScanDetails] = useState (false);
    const [assetScore, setAssetScore] = useState(false);
    const [assetVuln, setAssetVuln] = useState(false);
    const [asvsFalse, setAsvsFalse] = useState(false);
    const [auditVuln, setAuditVuln] = useState(false);
    const [calendar, setCalendar] = useState(false);
    const [deleteBulkAsset, setDeleteBulkAsset] = useState(false);
    const [deleteMit, setDeleteMit] = useState(false);
    const [elasticAssetUpload, setElasticAssetUpload] = useState(false);
    const [elasticDeviceTypesUpload, setElasticDeviceTypesUpload] = useState(false);
    const [elasticPatchUpload, setElasticPatchUpload] = useState(false);
    const [elasticStigUpload, setElasticStigUpload] = useState(false);
    const [getVulnUpdate, setGetVulnUpdate] = useState (false);
    const [importAsset, setImportAsset] = useState(false);
    const [lookup, setLookup] = useState(false);
    const [neo4j, setNeo4j] = useState(false);
    const [opSystem, setOpSystem] = useState(false);
    const [patchExport, setPatchExport] = useState(false);
    const [patchVuln, setPatchVuln] = useState(false);
    const [posture, setPosture] = useState(false);
    const [scanDetails, setScanDetails] = useState(false);
    const [subnets, setSubnets] = useState(false);
    const [suspense, setSuspense] = useState(false);
    const [updateTemplate, setUpdateTemplate] = useState(false);

    const handleAssetPatchVuln = () => {
        setAssetVuln(true);
    };

    const handleAssetScanDetails = () => {
        setAssetScanDetails(true);
    }

    const handleAssetScore = () => {
        setAssetScore(true);
    };

    const handleAuditVuln = () => {
        setAuditVuln(true)
    };

    const handleAsvsFalse = () => {
        setAsvsFalse(true)
    };

    const handleCalendar = () => {
        setCalendar(true);
    };

    const handleDeleteBulkAsset = () => {
       setDeleteBulkAsset(true);
    };

    const handleDeleteMit = () => {
        setDeleteMit(true);
    };

    const handleElasticAssetUpload = () => {
        setElasticAssetUpload(true);
    };

    const handleElasticDeviceTypesUpload = () => {
        setElasticDeviceTypesUpload(true);
    };

    const handleElasticPatchUpload = () => {
        setElasticPatchUpload(true);
    };

    const handleElasticStigUpload = () => {
        setElasticStigUpload(true);
    };

    const handleGetAsset = () => {
        setGetAsset(true)
    };

    const handleGetVulnUpdate = () => {
        setGetVulnUpdate(true);
    }

    const handleImportAsset = () => {
        setImportAsset(true);
    };

    const handleLookup = () => {
        setLookup(true);
    };

    const handleNeo4j = () => {
        setNeo4j(true);
    };

    const handleOpSystem = () => {
        setOpSystem(true);
    }

    const handlePatchVuln = () => {
        setPatchVuln(true);
    };

    const handlePostures = () => {
        setPosture(true);
    };

    const handleScanDetails = () => {
        setScanDetails(true);
    };

    const handlePatchData = () => {
        setPatchExport(true);
    }

    const handleSetSubnets = () => {
        setSubnets(true);
    };

    const handleSetSuspense = () => {
        setSuspense(true);
    };

    const handleSetUpdateTemplate = () => {
        setUpdateTemplate(true);
    };

    const handleClose = () => {
        setAssetScore(false);
        setAssetScanDetails(false);
        setAsvsFalse (false);
        setAuditVuln(false)
        setCalendar(false);
        setDeleteBulkAsset(false);
        setDeleteMit(false);
        setElasticAssetUpload(false);
        setElasticDeviceTypesUpload(false);
        setElasticPatchUpload(false);
        setElasticStigUpload(false);
        setGetAsset(false);
        setGetVulnUpdate(false);
        setImportAsset(false);
        setLookup(false);
        setNeo4j(false);
        setOpSystem(false);
        setPatchVuln(false);
        setPatchExport(false);
        setPosture(false);
        setScanDetails(false);
        setSubnets(false);
        setSuspense(false);
        setUpdateTemplate(false);
    };

    return (
        <>
            <Container sx={{height: '1000px', width: '100%', m: 2}}>
                <Typography
                    variant='h4'
                    component='h4'
                    sx={{textAlign: 'center', mt: 3, mb: 3}}
                >Maintenance
                </Typography>

                <h3>Asset</h3>
                <button className="btn-info m-2 p-2" onClick={handleDeleteBulkAsset}> Bulk Asset Delete</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleLookup}>Lookup</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleGetAsset}>Get Assets</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleOpSystem}>Get Operating Systems</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleImportAsset}>Import Assets</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleSetSubnets}>Set Subnets</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleAssetScanDetails}>Asset Scan Details</button>

                <h3>Audit</h3>
                <button className="btn-info m-2 p-2" onClick={handleAuditVuln}>Get Audit Results</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handlePostures}>Get Postures</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleAsvsFalse}>Set ASVS False</button>
                &nbsp;

                <h3>Calendar</h3>
                <button className="btn-info m-2 p-2" onClick={handleCalendar}>Import Calendar</button>

                <h3>Elastic</h3>
                <button className="btn-info m-2 p-2" onClick={handleElasticAssetUpload}>Asset</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleElasticPatchUpload}>Patch</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleElasticStigUpload}>STIG</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleElasticDeviceTypesUpload}>Device Types</button>

                <h3>Neo4J</h3>
                <button className="btn-info m-2 p-2" onClick={handleNeo4j}>Update Neo4j</button>

                <h3>Patch Vulnerability</h3>
                <button className="btn-info m-2 p-2" onClick={handlePatchVuln}>Get Vulnerabilities</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleAssetPatchVuln}>Get Asset Vulnerabilities</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleDeleteMit}>Delete Mitigations</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleAssetScore}>Get Scores</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleScanDetails}>Get Scan Details</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handlePatchData}>Export Patch Data</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleSetSuspense}>Set Suspense Dates</button>
                &nbsp;
                <button className="btn-info m-2 p-2" onClick={handleGetVulnUpdate}>Get Vulnerability Updates</button>

                <h3>STIG Template</h3>
                <button className="btn-info m-2 p-2" onClick={handleSetUpdateTemplate}>Update Template</button>

                {assetScore ?
                    <AssetScore
                        open={assetScore}
                        onClose={handleClose}
                        setAssetScore={setAssetScore}
                    />
                    : null
                }

                {assetScanDetails ?
                    <AssetScanDetails
                        open={assetScanDetails}
                        onClose={handleClose}
                        setAssetScanDetails={setAssetScanDetails}
                    />
                    : null
                }

                {assetVuln ?
                    <AssetVuln
                        open={assetVuln}
                        onClose={handleClose}
                        setAcasAssetVuln={setAssetVuln}
                    />
                    : null
                }

                {asvsFalse ?
                    <AsvsFalse
                        open={asvsFalse}
                        onClose={handleClose}
                        setAcasAssetVuln={setAsvsFalse}
                    />
                    : null
                }

                {auditVuln ?
                    <AuditVuln
                        open={auditVuln}
                        onClose={handleClose}
                        setAuditVuln={setAuditVuln}
                    />
                    : null
                }

                {calendar ?
                    <ImportCalendar
                        open={calendar}
                        onClose={handleClose}
                        setCalendar={setCalendar}
                    />
                    : null
                }

                {deleteBulkAsset ?
                    <DeleteBulkAsset
                        open={deleteBulkAsset}
                        onClose={handleClose}
                        setDeleteBulkAsset={setDeleteBulkAsset}
                    />
                    : null
                }

                {deleteMit ?
                    <DeleteMit
                        open={deleteMit}
                        onClose={handleClose}
                        setDeleteMit={setDeleteMit}
                    />
                    : null
                }

                {elasticAssetUpload ?
                    <ElasticAssetUpload
                        open={elasticAssetUpload}
                        onClose={handleClose}
                        setElasticAssetUpload={setElasticAssetUpload}
                    />
                    : null
                }

                {elasticDeviceTypesUpload ?
                    <ElasticDeviceTypesUpload
                        open={elasticDeviceTypesUpload}
                        onClose={handleClose}
                        setElasticDeviceTypesUpload={setElasticDeviceTypesUpload}
                    />
                    : null
                }

                {elasticPatchUpload ?
                    <ElasticPatchUpload
                        open={elasticPatchUpload}
                        onClose={handleClose}
                        setElasticPatchUpload={setElasticPatchUpload}
                    />
                    : null
                }

                {elasticStigUpload ?
                    <ElasticStigUpload
                        open={elasticStigUpload}
                        onClose={handleClose}
                        setElasticStigUpload={setElasticStigUpload}
                    />
                    : null
                }

                {getAsset ?
                    <GetAsset
                        open={getAsset}
                        onClose={handleClose}
                        setGetAsset={setGetAsset}
                    />
                    : null
                }

                {getVulnUpdate ?
                    <GetVulnUpdate
                        open={getVulnUpdate}
                        onClose={handleClose}
                        setGetVulnUpdate={setGetVulnUpdate}
                    />
                    : null
                }

                {importAsset ?
                    <ImportAsset
                        open={importAsset}
                        onClose={handleClose}
                        setImportAsset={setImportAsset}
                    />
                    : null
                }

                {lookup ?
                    <Lookup
                        open={lookup}
                        onClose={handleClose}
                        setLookup={setLookup}
                    />
                    : null
                }

                {neo4j ?
                    <Neo4j
                        open={neo4j}
                        onClose={handleClose}
                        setNeo4j={setNeo4j}
                    />
                    : null
                }

                {opSystem ?
                    <OpSystem
                        open={opSystem}
                        onClose={handleClose}
                        setOpSystem={setOpSystem}
                    />
                    : null
                }

                {patchExport ?
                    <PatchExport
                        open={patchExport}
                        onClose={handleClose}
                        setPatchExport={setPatchExport}
                    />
                    : null
                }

                {patchVuln ?
                    <PatchVuln
                        open={patchVuln}
                        onClose={handleClose}
                        setPatchVuln={setPatchVuln}
                    />
                    : null
                }

                {posture ?
                    <Posture
                        open={posture}
                        onClose={handleClose}
                        setPosture={setPosture}
                    />
                    : null
                }

                {scanDetails ?
                    <ScanDetails
                        open={scanDetails}
                        onClose={handleClose}
                        setScanDetails={setScanDetails}
                    />
                    : null
                }

                {subnets ?
                    <Subnets
                        open={subnets}
                        onClose={handleClose}
                        setSubnets={setSubnets}
                    />
                    : null
                }

                {suspense ?
                    <SetSuspense
                        open={suspense}
                        onClose={handleClose}
                        setSuspense={setSuspense}
                    />
                    : null
                }

                {updateTemplate ?
                    <SetUpdateTemplate
                        open={updateTemplate}
                        onClose={handleClose}
                        setUpdateTemplate={setUpdateTemplate}
                    />
                    : null
                }
            </Container>
        </>
    )
};